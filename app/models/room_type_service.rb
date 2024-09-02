class RoomTypeService < ApplicationRecord
  belongs_to :room_type
  belongs_to :service
end
