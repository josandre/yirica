class ReservationRepository

  def get_reservations
    Reservation.includes(:reservation_state, :bill, reservation_room: :room)
  end

  def get_reservation_by_code(search_code)
    Reservation
      .includes(:reservation_state, :bill, reservation_room: :room)
      .find(search_code: search_code)
  end

  def get_reservations_by_user(user)
    user.reservations.includes(:reservation_state, :bill, reservation_room: :room)
  end

  def get_user_reservation_by_id(user, reservation_id)
    user.reservations
        .includes(:reservation_state, :bill, reservation_room: :room)
        .find(reservation_id)
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