

class StripeService

  def initialize
    @user_service = UserService.new
    @reservation_service = ReservationService.new
    @response_cancel_reservation_service = ResponseCancelService.new
  end


  def payment_intend(user_id, reservation_info, rooms, metadata, total)
    user = @user_service.get_by_id(user_id)
    admin = @user_service.get_admin
    flattened_metadata = flatten_metadata(metadata)

    begin
      @payment_intend = Stripe::PaymentIntent.create({
                                     amount: total * 100,
                                     currency: 'usd',
                                     payment_method: 'pm_card_visa',
                                     confirm: true,
                                     description: "Yiri ca hotel reservation payment",
                                     metadata: flattened_metadata.merge({
                                                                          client: "#{user.name} #{user.last_name}",
                                                                          user_id: user.id
                                                                        }),
                                     automatic_payment_methods: {enabled: true, allow_redirects: "never"}
                                   })


      if @payment_intend.status == 'succeeded'
        search_code = @reservation_service.create_search_code
        payment_id = @payment_intend.id
        PaymentSuccessJob.perform_later(user, reservation_info, rooms, metadata, total, search_code, payment_id, admin)
      end
      return @payment_intend
    rescue Stripe::StripeError => e
      raise e
    end
  end


  def make_a_refund(reservation_id, cancel_request_id, response, admin)

    if response
      cancel_accepted(reservation_id, cancel_request_id, response, admin)
    else
      cancel_rejected(reservation_id, cancel_request_id, response, admin)
    end
  end


  private
  def flatten_metadata(metadata)
    flattened_metadata = {}

    metadata.each_with_index do |meta, index|
      flattened_metadata["metadata_#{index}"] = meta.to_json
    end

    flattened_metadata
  end

  def cancel_accepted(reservation_id, cancel_request_id, response, admin)

    begin
      reservation = @reservation_service.get_reservation_by_id(reservation_id)
      user = @user_service.get_by_id(reservation.user_id)
      if reservation.present?
        payment_id = reservation.payment_id
        payment_intent = Stripe::PaymentIntent.retrieve(payment_id)
        charge_id = payment_intent.latest_charge
        refund = Stripe::Refund.create({
                                         charge: charge_id,
                                         reason: "requested_by_customer"
                                       })

        is_refunded = false
        refund_information = "The refund could not be created because of an error, contact support. To make the refund manually."
        if refund.status == 'succeeded'
          is_refunded = true
          @reservation_service.update_is_refunded(reservation, is_refunded)
          refund_information = "The refunded was created and executed successfully to the reservation #{reservation.search_code}. It may take a few days for the money to reach the bank account. Refund id: #{refund.id},  Payment: #{payment_intent.id}, charge: #{charge_id}"
        end
        @reservation_service.change_reservation_state(reservation)
        response_cancel_requested = @response_cancel_reservation_service.create_response_cancel_reservation(response, refund_information, is_refunded, cancel_request_id)
        CancelResponseJob.perform_later(response, response_cancel_requested.date, response_cancel_requested.refund_information, response_cancel_requested.is_refunded, user, admin)

        {
          status: { code: 200, message: 'The cancellation and refund was successful.' },
          data:
            response_cancel_requested.as_json(only: [:id, :response, :date, :refund_information, :is_refunded, :cancel_request_id]),
          status_code: :ok
        }
      else
        {
          status: { code: 404, message: 'The reservation does not exist' },
          status_code: :not_found
        }
      end
    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while responding the cancel request.', error: e.message },
        status_code: :internal_server_error
      }
    end
  end

  def cancel_rejected(reservation_id, cancel_request_id, response, admin)

    begin
      reservation = @reservation_service.get_reservation_by_id(reservation_id)
      user = @user_service.get_by_id(reservation.user_id)

      if reservation.present?
        is_refunded = false
        refund_information = "The canceled request was not accepted. There is not a refund accepted."

        @reservation_service.change_reservation_state_active(reservation)
        response_cancel_requested = @response_cancel_reservation_service.create_response_cancel_reservation(response, refund_information, is_refunded, cancel_request_id)
        CancelResponseJob.perform_later(response, response_cancel_requested.date, response_cancel_requested.refund_information, response_cancel_requested.is_refunded, user, admin)

        {
          status: { code: 200, message: 'The rejected cancel request was successful.' },
          status_code: :ok
        }
      else
        {
          status: { code: 404, message: 'The reservation does not exist' },
          status_code: :not_found
        }
      end
    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while responding the cancel request.', error: e.message },
        status_code: :internal_server_error
      }
    end
  end



end