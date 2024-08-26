class CreateImageRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :image_rooms do |t|
      t.string :image
      t.boolean :is_principal

      t.timestamps
    end
  end
end
