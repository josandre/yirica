class AddRoomIdToImageRooms < ActiveRecord::Migration[7.1]
  def change
    add_reference :image_rooms, :room, null: false, foreign_key: true
  end
end
