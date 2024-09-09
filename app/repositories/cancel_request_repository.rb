class CancelRequestRepository

  def create_cancel_request(reason, reservation_id)
    CancelRequest.create!(
      reason: reason,
      date: Time.now.utc,
      is_confirmed: false,
      reservation_id: reservation_id
    )
  end

  def get_all_cancel_requests
    CancelRequest.includes(reservation: :bill).all
  end

end