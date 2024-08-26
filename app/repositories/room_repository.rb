
class RoomRepository

  def initialize
    @relation = Room.includes(:room_type)
  end

  def most_used
    @relation.where(is_active: true)
             .order(usage_amount: :desc)
             .limit(3)
  end

  def search_availability(check_in, check_out, adults, children)
    available_rooms = available_between(check_in, check_out).joins(:room_type)
    available_rooms = available_rooms.where('room_types.max_people >= ?', adults + children)

    if children > 0
      available_rooms = available_rooms.where('room_types.kids_accepted = ?', true)
    else
      available_rooms = available_rooms.where('room_types.kids_accepted = ?', false)
    end

    available_rooms
  end


  private
  def available_between(check_in, check_out)
    Room.where.not(id: ReservationRoom.joins(:reservation)
                                      .where('reservations.checking_date < ? AND reservations.checkout_date > ?', check_out, check_in)
                                      .select(:room_id))
  end


end