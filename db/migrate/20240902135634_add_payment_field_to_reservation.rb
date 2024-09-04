class AddPaymentFieldToReservation < ActiveRecord::Migration[7.1]
  def change
    add_column :reservations, :payment_id, :string
  end
end
