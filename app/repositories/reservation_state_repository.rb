class ReservationStateRepository

  def get_default_state
    ReservationState.find_by(state: 'Active')
  end
end