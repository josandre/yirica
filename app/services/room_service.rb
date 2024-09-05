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

  def get_room_by_id(room_id)
    @room_repository.get_room_by_id(room_id)
  end


  def get_room_with_details(room_id)
    room = @room_repository.get_room_by_id(room_id)
    {
      room: room,
      room_type: room.room_type,
      image_rooms: room.image_rooms.select(:id, :image, :is_principal),
      amenities: room.room_type.amenities.select(:id, :name),
      services: room.room_type.services.select(:id, :name)
    }
  rescue ActiveRecord::RecordNotFound
    { error: 'Room not found' }.to_json
  end

  def get_all_rooms
    begin
      rooms = @room_repository.get_all_rooms

      if rooms.present?
        {
          status: { code: 200, message: 'Rooms retrieved successfully.' },
          data: rooms.as_json(include: { comments: { include: :responses }, room_type: {}, image_rooms: {} }),
          status_code: :ok
        }
      else
        {
          status: { code: 422, message: 'There are not enough rooms available.' },
          status_code: :unprocessable_entity
        }
      end
    rescue => e
      {
        status: { code: 500, message: 'An error occurred while fetching rooms.', error: e.message },
        status_code: :internal_server_error
      }
    end
  end


end