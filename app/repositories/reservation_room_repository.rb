class ReservationRoomRepository

  def room_exists(reservation, room)
    Rails.logger.info "Room in ReservationRoomRepository: #{room},#{room.id} "
    Rails.logger.info "Reservation: #{reservation.inspect}"
    ReservationRoom.exists?(reservation_id: reservation.id, room_id: room.id)
  end

  def create_reservation_room(reservation, room, room_metadata)
    Rails.logger.info "room id info: #{room.id} "
    Rails.logger.info "room in create reservationRoom: #{room_metadata} "
    kids = room_metadata['kids'] || room_metadata[:kids]
    adults = room_metadata['adults'] || room_metadata[:adults]
    Rails.logger.info "kids and room: #{kids} #{adults} "
    ReservationRoom.create!(
      room_id: room.id,
      reservation_id: reservation.id,
      kids_amount: kids.to_i,
      adults_amount: adults.to_i,
    )
  end
end