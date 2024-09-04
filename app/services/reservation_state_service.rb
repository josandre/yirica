class ReservationStateService

  def initialize
    @reservation_state_repository = ReservationStateRepository.new
  end

  def get_default_state
    @reservation_state_repository.get_default_state
  end
end