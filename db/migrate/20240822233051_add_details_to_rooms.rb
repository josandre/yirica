class AddDetailsToRooms < ActiveRecord::Migration[7.1]
  def change
    add_column :rooms, :sqm, :integer
    add_column :rooms, :bathrooms, :integer
    add_column :rooms, :beds, :integer
  end
end
