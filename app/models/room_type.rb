class RoomType < ApplicationRecord
  has_many :rooms
  has_many :room_type_amenities
  has_many :amenities, through: :room_type_amenities
  has_many :room_type_services
  has_many :services, through: :room_type_services
end


