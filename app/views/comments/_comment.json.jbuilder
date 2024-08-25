json.extract! comment, :id, :comment, :punctuation, :is_legal, :user_id, :room_id, :created_at, :updated_at
json.url comment_url(comment, format: :json)
