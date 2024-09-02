class RoomTypeAmenity < ApplicationRecord
  belongs_to :room_type
  belongs_to :amenity
end
