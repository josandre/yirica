class ReservationStateService

  def initialize
    @reservation_state_repository = ReservationStateRepository.new
  end

  def get_default_state
    @reservation_state_repository.get_default_state
  end

  def get_cancel_request_state
    @reservation_state_repository.get_canceled_request_state
  end

  def get_all_state
    begin
      states = @reservation_state_repository.get_all_states

      if states.present?
        {
          status: { code: 200, message: 'List successfully retrieved' },
          data: states.as_json(only: [:id, :state]),
          status_code: :ok
        }

      else
        {
          status: { code: 404, message: 'There is not states' },
          status_code: :not_found
        }
      end

    rescue StandardError => e
      render json: { error: 'An unexpected error occurred', details: e.message }, status: :internal_server_error
    end

  end

  def get_canceled_state
   @reservation_state_repository.get_canceled_state
  end
end