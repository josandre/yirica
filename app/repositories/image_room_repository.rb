class ImageRoomRepository

  def create(room_id, image)
    ImageRoom.create!(
      room_id: room_id,
      image: image,
      is_principal: true
    )
  end

  def get_images_by_room_id(room_id)
    ImageRoom.where(room_id: room_id)
  end

  def delete_images_by_room_id(images)
    images.destroy_all
  end



end