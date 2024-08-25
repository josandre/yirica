class RenameTypeColumnInRoomTypesToName < ActiveRecord::Migration[7.1]
  def change
    rename_column :room_types, :type, :name
  end
end
