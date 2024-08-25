class CreateResponseCancels < ActiveRecord::Migration[7.1]
  def change
    create_table :response_cancels do |t|
      t.text :response
      t.date :date
      t.text :refund_information
      t.boolean :is_refunded
      t.references :cancel_request, null: false, foreign_key: true

      t.timestamps
    end
  end
end
