class RemoveKidsAndAdultsAmountFromReservations < ActiveRecord::Migration[7.1]
  def change
    remove_column :reservations, :kids_amount, :integer
    remove_column :reservations, :adults_amount, :integer
  end
end
