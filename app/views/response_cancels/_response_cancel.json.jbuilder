json.extract! response_cancel, :id, :response, :date, :refund_information, :is_refunded, :cancel_request_id, :created_at, :updated_at
json.url response_cancel_url(response_cancel, format: :json)
