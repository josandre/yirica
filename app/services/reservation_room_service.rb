class ReservationRoomService

  def initialize
    @reservation_room_repository = ReservationRoomRepository.new
  end

  def room_exists(reservation, room)
    @reservation_room_repository.room_exists(reservation, room)
  end


  def create_reservation_room(reservation, room)
    @reservation_room_repository.create_reservation_room(reservation, room)
  end


end