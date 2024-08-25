class Reservation < ApplicationRecord
  belongs_to :reservation_state
  belongs_to :user
  has_one :bill, dependent: :destroy
  has_one :cancel_request, dependent: :destroy
  has_many :reservation_room
  has_many :rooms, through: :reservation_room
end
