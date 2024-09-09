

class StripeService

  def initialize
    @user_service = UserService.new
    @reservation_service = ReservationService.new
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


  private
  def flatten_metadata(metadata)
    flattened_metadata = {}

    metadata.each_with_index do |meta, index|
      flattened_metadata["metadata_#{index}"] = meta.to_json
    end

    flattened_metadata
  end



end