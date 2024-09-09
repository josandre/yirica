class ReservationService


  def initialize
    @reservation_repository = ReservationRepository.new
    @room_service = RoomService.new
    @reservation_room_services = ReservationRoomService.new
    @bill_service = BillService.new
    @reservation_state_service = ReservationStateService.new
  end


  def update_reservation_state(reservation, state)
    @reservation_repository.update_state(reservation, state)
  end

  def get_reservations

    begin
      reservations = @reservation_repository.get_reservations

      if reservations.present?
        {
          status: { code: 200, message: 'List successfully retrieved' },
          data: reservations.as_json(only: [:id, :checking_date, :checkout_date, :is_refunded, :created_at, :updated_at, :payment_id, :search_code ],
                                     include: {
                                       reservation_state: {
                                         only: [:id, :state],
                                       },
                                       bill: {
                                         only: [:id, :discount,  :taxes, :total, :refund_price]
                                       },
                                       reservation_room: {
                                         only: [:id, :room_id, :reservation_id, :created_at, :updated_at, :kids_amount, :adults_amount],
                                         include: {
                                           room: {
                                             only: [:id, :usage_amount, :adult_price, :kids_price, :number, :location, :room_type_id, :created_at, :updated_at, :is_active, :is_beachfront, :sqm, :bathrooms, :beds],
                                             include: {
                                               room_type: {
                                                 only: [:id, :name, :description, :max_people, :kids_accepted, :created_at, :updated_at]
                                               }
                                             }
                                          }
                                         }
                                       }
                                     }),
          status_code: :ok
        }

      else
        {
          status: { code: 404, message: 'There is not reservations' },
          status_code: :not_found
        }
      end

    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while creating the comment.', error: e.message },
        status_code: :internal_server_error
      }
    end
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

    bill = @bill_service.bill_exits_by_reservation(reservation)

    if bill
      Rails.logger.info "Bill already exists: #{bill}. Returning the existing bill."
      Rails.logger.info "Bill already exists for reservation ID: #{reservation.id}. Returning the existing bill."
    else
      bill = @bill_service.create_bill(reservation, total)
      Rails.logger.info "Bill created for reservation ID: #{reservation.id}"
    end

    Rails.logger.info "Bill already exists bill returned: #{bill}. Returning bill."
    [reservation, bill]
  end

  def get_reservation_by_id(reservation_id)
    @reservation_repository.get_reservation_by_id(reservation_id)
  end


  # def create_search_code
  #   middle_part = rand(1000..9999)
  #   last_part = rand(10..99)
  #   "RS_#{middle_part}_#{last_part}"
  # end


  def create_search_code
    loop do
      middle_part = rand(1000..9999)
      last_part = rand(10..99)
      code_generated = "RS_#{middle_part}_#{last_part}"
      unless Reservation.exists?(search_code: code_generated)
         code_generated
        break
      end
    end
  end

  private
  def default_reservation_state
    @reservation_state_service.get_default_state
  end
end