json.extract! room_type, :id, :type, :description, :max_people, :kids_accepted, :created_at, :updated_at
json.url room_type_url(room_type, format: :json)
