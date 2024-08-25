class AddCommentReferenceToResponse < ActiveRecord::Migration[7.1]
  def change
    add_reference :responses, :comment, null: false, foreign_key: true
  end
end
