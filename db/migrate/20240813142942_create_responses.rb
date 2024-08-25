class CreateResponses < ActiveRecord::Migration[7.1]
  def change
    create_table :responses do |t|
      t.string :response
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
