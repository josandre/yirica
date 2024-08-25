json.extract! user, :id, :email, :name, :last_name, :password, :phone, :role_id, :created_at, :updated_at
json.url user_url(user, format: :json)
