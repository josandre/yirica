class ChangeResponseFromTextToBooleanInResponseCancelRequests < ActiveRecord::Migration[7.1]
  def change
    change_column :response_cancel_requests, :response, :boolean
  end
end
