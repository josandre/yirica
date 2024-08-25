json.extract! reservation_room, :id, :room_id, :reservation_id, :created_at, :updated_at
json.url reservation_room_url(reservation_room, format: :json)
