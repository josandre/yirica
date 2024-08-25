class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :room
  has_many :response
  validates :comment, presence: true
end
