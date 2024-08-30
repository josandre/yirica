class Service < ApplicationRecord
  has_many :room_type_services
  has_many :room_types, through: :room_type_services
end
