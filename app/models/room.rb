class Room < ApplicationRecord
  belongs_to :room_type
  has_many :comments, dependent: :destroy
  has_many :reservation_room
  has_many :reservations, through: :reservation_room
  has_many :image_rooms, dependent: :destroy
end
