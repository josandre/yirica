class ImageRoomRepository

  def create(room_id, image)
    ImageRoom.create!(
      room_id: room_id,
      image: image,
      is_principal: true
    )
  end
end