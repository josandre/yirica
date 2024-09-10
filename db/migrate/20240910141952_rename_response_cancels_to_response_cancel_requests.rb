class RenameResponseCancelsToResponseCancelRequests < ActiveRecord::Migration[7.1]
  def change
    rename_table :response_cancels, :response_cancel_requests
  end
end
