class ReservationService


  def initialize
    @reservation_repository = ReservationRepository.new
    @room_service = RoomService.new
    @reservation_room_services = ReservationRoomService.new
    @bill_service = BillService.new
    @reservation_state_service = ReservationStateService.new
  end

  def get_reservations
    @reservation_repository.get_reservations
  end

  def get_reservations_by_code(search_code)
    @reservation_repository.get_reservation_by_code(search_code)
  end

  def get_reservations_by_user(user)
    @reservation_repository.get_reservations_by_user(user)
  end

  def get_user_reservation_by_id(user, reservation_id)
    @reservation_repository.get_user_reservation_by_id(user, reservation_id)
  end


  def create_reservation(user, metadata, reservation_info, rooms, total, search_code, payment_id)
    reservation = @reservation_repository.find_or_initialized_by_search_code(search_code)

    if reservation.persisted?
      Rails.logger.info "Reservation already exists with search_code: #{search_code}. Skipping creation."
    else
      reservation = @reservation_repository.assign_atributes_to_reservation(reservation, reservation_info, user, default_reservation_state, payment_id, search_code)
      Rails.logger.info "Reservation created with search_code: #{search_code}"
    end

    puts "metadata #{metadata}"
    metadata.each do |room|
      room_id = room["roomId"] || room[:roomId]
      room_object = @room_service.get_room_by_id(room_id)
      Rails.logger.info "room by id #{room_object}"
      response = @reservation_room_services.room_exists(reservation, room_object)
      Rails.logger.info "response #{response}"
      unless response
        @reservation_room_services.create_reservation_room(reservation, room_object, room)
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