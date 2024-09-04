class AddKidsAndAdultsAmountToReservationRooms < ActiveRecord::Migration[7.1]
  def change
    add_column :reservation_rooms, :kids_amount, :integer
    add_column :reservation_rooms, :adults_amount, :integer
  end
end
