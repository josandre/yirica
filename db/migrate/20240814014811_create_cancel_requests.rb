class CreateCancelRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :cancel_requests do |t|
      t.text :reason
      t.date :date
      t.boolean :is_confirmed
      t.references :reservation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
