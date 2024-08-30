class CreateRoomTypeServices < ActiveRecord::Migration[7.1]
  def change
    create_table :room_type_services do |t|
      t.references :room_type, null: false, foreign_key: true
      t.references :service, null: false, foreign_key: true

      t.timestamps
    end
  end
end
