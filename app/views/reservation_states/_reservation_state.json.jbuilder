json.extract! reservation_state, :id, :state, :created_at, :updated_at
json.url reservation_state_url(reservation_state, format: :json)
