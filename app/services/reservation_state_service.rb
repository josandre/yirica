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
end