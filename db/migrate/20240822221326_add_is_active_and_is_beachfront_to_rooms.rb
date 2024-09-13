class AddIsActiveAndIsBeachfrontToRooms < ActiveRecord::Migration[7.1]
  def change
    add_column :rooms, :is_active, :boolean
    add_column :rooms, :is_beachfront, :boolean
  end
end
