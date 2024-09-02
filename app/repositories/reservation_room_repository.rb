class ReservationRoomRepository

  def room_exists(reservation, room)
    ReservationRoom.exists?(reservation_id: reservation.id, room_id: room.id)
  end

  def create_reservation_room(reservation, room)
    ReservationRoom.create!(
      room_id: room.id,
      reservation_id: reservation.id
    )
  end
end