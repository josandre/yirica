class CancelRequest < ApplicationRecord
  belongs_to :reservation
  has_one :response_cancel_request, dependent: :destroy
end
