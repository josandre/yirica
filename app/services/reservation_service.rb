class ReservationService


  def initialize
    @reservation_repository = ReservationRepository.new
    @room_service = RoomService.new
    @reservation_room_services = ReservationRoomService.new
    @bill_service = BillService.new
    @reservation_state_service = ReservationStateService.new
  end

  def get_reservations_by_user(user_id)
    reservations = @reservation_repository.get_reservations_by_user(user_id)

    reservations.each do |reservation|
      puts "Reservation ID: #{reservation.id}"
      puts "Check-in Date: #{reservation.checkingDate}"
      puts "Check-out Date: #{reservation.checkoutDate}"
      puts "User Notes: #{reservation.userNotes}"
      puts "Is Refunded: #{reservation.isRefunded}"
      puts "Reservation State: #{reservation.reservation_state.state}"

      if reservation.bill
        puts "Bill ID: #{reservation.bill.id}"
        puts "Total: #{reservation.bill.total}"
        puts "Discount: #{reservation.bill.discount}"
        puts "Taxes: #{reservation.bill.taxes}"
      end

      reservation.reservation_rooms.each do |reservation_room|
        room = reservation_room.room
        puts "Room ID: #{room.id}"
        puts "Room Type: #{room.roomType}"
        puts "Room Number: #{room.roomNumber}"
      end

      puts "-----------------------------------"
    end
  end


  def create_reservation(user, reservation_info, rooms, total, search_code, payment_id)
    reservation = @reservation_repository.find_or_initialized_by_search_code(search_code)

    if reservation.persisted?
      Rails.logger.info "Reservation already exists with search_code: #{search_code}. Skipping creation."
    else
      reservation = @reservation_repository.assign_atributes_to_reservation(reservation, reservation_info, user, default_reservation_state, payment_id)
      Rails.logger.info "Reservation created with search_code: #{search_code}"
    end

    rooms.each do |id|
      room = @room_service.get_room_by_id(id)
      unless @reservation_room_services.room_exists(reservation, room)
        @reservation_room_services.create_reservation_room(reservation, room)
        Rails.logger.info "Reservation room service created"
      end
    end


    unless @bill_service.bill_exits_by_reservation(reservation)
      bill = @bill_service.create_bill(reservation, total)
      Rails.logger.info "Bill created for reservation ID: #{reservation.id}"
    end

    [reservation, bill]
  end


  def create_search_code
    middle_part = rand(1000..9999)
    last_part = rand(10..99)
    "RS_#{middle_part}_#{last_part}"
  end

  private
  def default_reservation_state
    @reservation_state_service.get_default_state
  end
end