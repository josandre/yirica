class ImageRoomService

  def initialize
    @image_room_repository = ImageRoomRepository.new
  end


  def create(room_id, image)
    @image_room_repository.create(room_id, image)
  end
end