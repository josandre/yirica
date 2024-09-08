class CancelRequestService

  def initialize
    @cancel_request_repository = CancelRequestRepository.new
    @reservation_service = ReservationService.new
  end

  def create_cancel_request(reason, reservation_id, current_user)
    begin
      reservation = @reservation_service.get_reservation_by_id(reservation_id)

      if reservation and reservation.user_id == current_user.id
        cancel_request = @cancel_request_repository.create_cancel_request(reason, reservation_id)
        {
          status: { code: 200, message: 'Cancel request created' },
          data: {
            id: cancel_request.reservation_id,
            reason: cancel_request.reason,
            is_confirmed: cancel_request.is_confirmed
          },
          status_code: :ok
        }
      else
        {
          status: { code: 404, message: 'Not found' },
          data: {
            id: reservation_id,
            reason: "The reservation provided do not exists",
          },
          status_code: :not_found
        }
      end

    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while creating the comment.', error: e.message },
        status_code: :internal_server_error
      }
    end

  end

  def get_all_cancel_requests
    begin
      cancel_requests = @cancel_request_repository.get_all_cancel_requests

      if cancel_requests.present?
        {
          status: { code: 200, message: 'List successfully retrieved' },
          data: cancel_requests.as_json(only: [:id, :reason, :is_confirmed],
                                        include: {
                                          reservation: {
                                            only: [:id, :checkingDate, :checkOutDate, :userNotes, :isRefunded, :payment_id],
                                            include: {
                                              bill: {
                                                only: [:id, :discount,  :taxes, :total, :refund_price]
                                              }
                                            }
                                          }
                                        }),
          status_code: :ok
        }

      else
        {
          status: { code: 404, message: 'There is not cancel requests' },
          status_code: :not_found
        }
      end

    rescue StandardError => e
      render json: { error: 'An unexpected error occurred', details: e.message }, status: :internal_server_error
    end
  end
end