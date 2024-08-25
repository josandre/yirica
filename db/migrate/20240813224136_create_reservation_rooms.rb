class CreateReservationRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :reservation_rooms do |t|
      t.references :room, null: false, foreign_key: true
      t.references :reservation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
