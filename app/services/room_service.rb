class RoomService

  def initialize
    @room_repository = RoomRepository.new
  end

  def search_room_availability(check_in, check_out, adults, children, rooms)
    @room_repository.search_availability(check_in, check_out, adults, children, rooms)
  end

  def most_used_rooms
    @room_repository.most_used
  end
end