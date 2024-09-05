
class RoomRepository

  def initialize
    @relation = Room.includes(:room_type)
  end

  def most_used
    Room.includes(:room_type, :image_rooms)
        .where(is_active: true)
        .order(usage_amount: :desc)
        .limit(3)
  end

  def search_availability(check_in, check_out, adults, children, rooms)
    available_rooms = available_between(check_in, check_out).joins(:room_type)
    available_rooms = available_rooms.where('room_types.max_people >= ?', adults + children)

    if children > 0
      available_rooms = available_rooms.where('room_types.kids_accepted = ?', true)
    else
      available_rooms = available_rooms.where('room_types.kids_accepted = ?', false)
    end

    return available_rooms if available_rooms.size >= rooms
    available_rooms
  end

  def get_room_by_id(id)
    Room.find(id)
  end

  def get_all_rooms
    Room.includes(:room_type, :image_rooms).all
  end

  private
  def available_between(check_in, check_out)
    Room.where.not(id: ReservationRoom.joins(:reservation)
                                      .where('reservations.checking_date < ? AND reservations.checkout_date > ?', check_out, check_in)
                                      .select(:room_id))
  end

end