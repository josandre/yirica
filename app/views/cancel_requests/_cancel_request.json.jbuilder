json.extract! cancel_request, :id, :reason, :date, :is_confirmed, :reservation_id, :created_at, :updated_at
json.url cancel_request_url(cancel_request, format: :json)
