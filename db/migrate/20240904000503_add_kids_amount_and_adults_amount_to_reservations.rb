class AddKidsAmountAndAdultsAmountToReservations < ActiveRecord::Migration[7.1]
  def change
    add_column :reservations, :kids_amount, :integer
    add_column :reservations, :adults_amount, :integer
  end
end
