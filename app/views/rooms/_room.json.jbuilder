json.extract! room, :id, :usage_amount, :adult_price, :kids_price, :number, :location, :room_type_id, :created_at, :updated_at
json.url room_url(room, format: :json)
