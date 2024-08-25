class Response < ApplicationRecord
  belongs_to :user
  belongs_to :comment
  validates :response, presence: true
end
