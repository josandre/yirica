class AddIsActiveAndIsBeachfrontToRooms < ActiveRecord::Migration[7.1]
  def change
    add_column :room, :is_active, :boolean
    add_column :room, :is_beachfront, :boolean
  end
end
