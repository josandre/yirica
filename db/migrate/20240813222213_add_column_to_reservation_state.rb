class AddColumnToReservationState < ActiveRecord::Migration[7.1]
  def change
    add_column :reservation_states, :description, :string
  end
end
