class CancelRequest < ApplicationRecord
  belongs_to :reservation
  has_one :response_cancel, dependent: :destroy
end
