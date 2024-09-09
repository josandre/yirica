class ReservationStateRepository

  def get_default_state
    ReservationState.find_by(state: 'Active')
  end

  def get_canceled_request_state
    ReservationState.find_by(state: 'Cancel requested')
  end
end