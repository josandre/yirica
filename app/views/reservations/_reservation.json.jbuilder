json.extract! reservation, :id, :checking_date, :checkout_date, :user_notes, :is_refunded, :reservation_state_id, :created_at, :updated_at
json.url reservation_url(reservation, format: :json)
