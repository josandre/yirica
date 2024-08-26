class RoomService

  def initialize
    @room_repository = RoomRepository.new
  end

  def search_room_availability(check_in, check_out, adults, children, rooms)
    rooms = @room_repository.search_availability(check_in, check_out, adults, children, rooms)
    serialize_with_principal_image(rooms)
  end

  def most_used_rooms
    rooms = @room_repository.most_used
    serialize_with_principal_image(rooms)
  end

  def serialize_with_principal_image(rooms)
    rooms.as_json(include: {
      room_type: {},
      image_rooms: {only:[:image], where: {is_principal: true}},
    })
  end
end