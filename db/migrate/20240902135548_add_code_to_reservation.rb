class AddCodeToReservation < ActiveRecord::Migration[7.1]
  def change
    add_column :reservations, :search_code, :string
  end
end
