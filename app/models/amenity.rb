class Amenity < ApplicationRecord
  has_many :room_type_amenities
  has_many :room_types, through: :room_type_amenities
end
