json.extract! bill, :id, :discount, :taxes, :room_price, :total, :refund_price, :reservation_id, :created_at, :updated_at
json.url bill_url(bill, format: :json)
