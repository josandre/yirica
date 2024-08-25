class CreateRoomTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :room_types do |t|
      t.string :type
      t.string :description
      t.integer :max_people
      t.boolean :kids_accepted

      t.timestamps
    end
  end
end
