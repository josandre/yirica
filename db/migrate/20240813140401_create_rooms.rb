class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.integer :usage_amount
      t.decimal :adult_price
      t.decimal :kids_price
      t.integer :number
      t.string :location
      t.references :room_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
