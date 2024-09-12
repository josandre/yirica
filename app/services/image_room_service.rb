class ImageRoomService

  def initialize
    @image_room_repository = ImageRoomRepository.new
  end


  def create(room_id, image)
    @image_room_repository.create(room_id, image)
  end


  def delete_images_by_room_id(room_id)
    images = @image_room_repository.get_images_by_room_id(room_id)
    @image_room_repository.delete_images_by_room_id(images)
  end
end