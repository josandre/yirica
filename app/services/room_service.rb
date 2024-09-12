class RoomService

  def initialize
    @room_repository = RoomRepository.new
    @image_room_repository = ImageRoomService.new
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
    comments = room.comments.includes(:response).where(is_legal: true).map do |comment|
      {
        id: comment.id,
        comment: comment.comment,
        punctuation: comment.punctuation,
        is_legal: comment.is_legal,
        user: comment.user,
        responses: comment.response.map do |response|
          {
            id: response.id,
            response: response.response,
            user: response.user
          }
        end
      }
    end


    {
      room: room,
      room_type: room.room_type,
      image_rooms: room.image_rooms.select(:id, :image, :is_principal),
      amenities: room.room_type.amenities.select(:id, :name),
      services: room.room_type.services.select(:id, :name),
      comments: comments,
    }
  rescue ActiveRecord::RecordNotFound
    { error: 'Room not found' }.to_json
  end


  def create(adult_price, kids_price, number, location, room_type_id, is_beachfront, sqm,  bathrooms,  beds, image)

    ActiveRecord::Base.transaction do
      room = @room_repository.create(adult_price, kids_price, number, location, room_type_id, is_beachfront, sqm,  bathrooms,  beds)
      image = @image_room_repository.create(room.id, image)


      if image.persisted?
        {
          status: { code: 200, message: 'Room and image created successfully.' },
          data: room.as_json(
            only: [:id, :adult_price, :kids_price, :number, :location, :room_type_id, :is_beachfront, :sqm, :bathrooms, :beds],
            include: {
              image_rooms: {
                            only: [:id, :image, :is_principal, :created_at, :updated_at]
              }
            }
          ),
          status_code: :ok
        }
      else
        raise ActiveRecord::Rollback, "Image was not saved"
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    {
      status: { code: 500, message: 'An error occurred while creating a room.', error: e.message },
      status_code: :internal_server_error
    }
  end

  def get_all_rooms
    begin
      rooms = @room_repository.get_all_rooms

      if rooms.present?
        {
          status: { code: 200, message: 'Rooms retrieved successfully.' },
          data: rooms.as_json(include: { room_type: {}, image_rooms: {} }),
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

  def update_room(room_id, adult_price, kids_price, number, location, room_type_id, is_beachfront, sqm, bathrooms, beds, image)

    begin
      room = @room_repository.get_room_by_id(room_id)


      if room.present?
        room_updated = @room_repository.update_room(room, adult_price, kids_price, number, location, room_type_id, is_beachfront, sqm, bathrooms, beds)
        @image_room_repository.delete_images_by_room_id(room_id)
        @image_room_repository.create(room.id, image)
        {
          status: { code: 200, message: 'Rooms updated successfully.' },
          data: room_updated.as_json(only: [:id, :adult_price, :kids_price, :number, :location, :room_type_id, :is_beachfront, :sqm, :bathrooms, :beds, :image]),
          status_code: :ok
        }
      else
        {
          status: { code: 404, message: 'The room do not exists' },
          status_code: :not_found
        }
      end

    rescue => e
      {
        status: { code: 500, message: 'An error occurred while updating rooms.', error: e.message },
        status_code: :internal_server_error
      }
    end

  end


end