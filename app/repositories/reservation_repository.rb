class ReservationRepository

  def get_reservations_by_user(user_id)
    User.find(user_id).reservations.includes(:reservation_state, :bill, reservation_rooms: :room)
  end

  def find_or_initialized_by_search_code(search_code)
    Reservation.find_or_initialize_by(search_code: search_code)
  end

  def assign_atributes_to_reservation(reservation, reservation_info, user, default_reservation_state, payment_id)
    reservation.assign_attributes(
      checking_date: reservation_info[:checkIn],
      checkout_date: reservation_info[:checkOut],
      user_notes: "Tests",
      user_id: user.id,
      reservation_state_id: default_reservation_state.id,
      is_refunded: true,
      payment_id: payment_id
    )
    reservation.save!
  end

end