class RoomTypeServiceRe

  def initialize
    @room_type_repository = RoomTypeRepository.new
  end

  def get_all_room_types
    begin
      room_types = @room_type_repository.get_all_room_types

      if room_types.present?
        {
          status: { code: 200, message: 'List successfully retrieved' },
          data: room_types.as_json(only: [:id, :name, :description, :max_people, :kids_accepted]),
          status_code: :ok
        }

      else
        {
          status: { code: 404, message: 'There is not room types' },
          status_code: :not_found
        }
      end

    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while creating the comment.', error: e.message },
        status_code: :internal_server_error
      }
    end
  end
end