 class UserReservationsController < ApplicationController
    before_action :set_user
    before_action :initialize_reservation_service

    # GET /user/47/reservations
    def index
      begin
        @reservations = @reservation_service.get_reservations_by_user(@user)

        if @reservations.present?
          render json: @reservations.as_json(
            include: { reservation_room: { include: :room }, bill: {}, reservation_state: {} }
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

    # GET /users/47/reservations/1
    def show
      reservation_id = params[:id]

      begin
        @reservation = @reservation_service.get_user_reservation_by_id(@user, reservation_id)

        if @reservation.present?
          render json: @reservation.as_json(
            only: [:id, :checking_date, :checkout_date],
            include: { reservation_room: { include: :room }, bill: {}, reservation_state: {} }
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
      def set_user
        puts "user #{params[:user_id]}"
        @user = User.find(params[:user_id])
      end

      def initialize_reservation_service
        @reservation_service = ReservationService.new
      end
  end