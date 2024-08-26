class ImageRoom < ApplicationRecord
  belongs_to :room
  validates :image, presence: true
end
