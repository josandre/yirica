class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.date :checking_date
      t.date :checkout_date
      t.text :user_notes
      t.boolean :is_refunded
      t.references :reservation_state, null: false, foreign_key: true

      t.timestamps
    end
  end
end
