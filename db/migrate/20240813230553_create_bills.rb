class CreateBills < ActiveRecord::Migration[7.1]
  def change
    create_table :bills do |t|
      t.decimal :discount
      t.decimal :taxes
      t.decimal :room_price
      t.decimal :total
      t.decimal :refund_price
      t.references :reservation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
