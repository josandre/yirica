class ChangeResponseToBeBooleanInResponseCancel < ActiveRecord::Migration[7.1]
  def change
    change_column :response_cancels, :response, :boolean
  end
end
