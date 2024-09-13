class ReservationStateRepository

  def get_default_state
    ReservationState.find_by(state: 'Active')
  end

  def get_canceled_request_state
    ReservationState.find_by(state: 'Cancel requested')
  end

  def get_all_states
    ReservationState.all
  end

  def get_canceled_state
    ReservationState.find_by(state: 'Canceled')
  end


  def get_active_state
    ReservationState.find_by(state: 'Active')
  end
end