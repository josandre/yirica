class ReservationsController < ApplicationController
  before_action :set_reservation, only: %i[edit update destroy]
  before_action :initialize_reservation_service
  skip_before_action :authenticate_request, only:[ :show]




  def show
    search_code = params[:id]
    puts "code #{search_code}"

    begin
      @reservations = @reservation_service.get_reservations_by_code(search_code)

      if @reservations.present?
        render json: @reservations.as_json(
          include: {
            reservation_room: {
              include: {
                room: {
                  include: :room_type
                }
              }
            },
            bill: {},
            reservation_state: {}
          }
        )
      else
        render json: { error: 'No reservations found for the user' }, status: :not_found
      end

    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found

    rescue StandardError => e
      render json: { error: 'An unexpected error occurred', details: e.message }, status: :internal_server_error
    end
  end


  private

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end
  def initialize_reservation_service
    @reservation_service = ReservationService.new
  end


end