json.extract! response, :id, :response, :user_id, :created_at, :updated_at
json.url response_url(response, format: :json)
