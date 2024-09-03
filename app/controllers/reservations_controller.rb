class ReservationsController < ApplicationController
  before_action :set_reservation, only: %i[ edit update destroy ]
  before_action :initialize_reservation_service

  # GET /reservations or /reservations.json
  def index
    begin
      @reservations = @reservation_service.get_reservations

      if @reservations.present?
        render json: @reservations.as_json(
          only: [:id, :checking_date, :checkout_date],
          include: { reservation_room: { include: :room }, bill: {}, reservation_state: {} }
        )
      else
        render json: { error: 'No reservations found for the user' }, status: :not_found
      end

    rescue StandardError => e
      render json: { error: 'An unexpected error occurred', details: e.message }, status: :internal_server_error
    end


  end

  # GET /reservations/1 or /reservations/1.json
  def show
    puts "entra"
    search_code = params[:id]

    begin
      @reservations = @reservation_service.get_reservations_by_code(search_code)

      if @reservations.present?
        render json: @reservations.as_json(
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

  # GET /reservations/new
  def new
    @reservation = Reservation.new
  end

  # GET /reservations/1/edit
  def edit
  end

  # POST /reservations or /reservations.json
  def create
    @reservation = Reservation.new(reservation_params)

    respond_to do |format|
      if @reservation.save
        format.html { redirect_to reservation_url(@reservation), notice: "Reservation was successfully created." }
        format.json { render :show, status: :created, location: @reservation }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reservations/1 or /reservations/1.json
  def update
    respond_to do |format|
      if @reservation.update(reservation_params)
        format.html { redirect_to reservation_url(@reservation), notice: "Reservation was successfully updated." }
        format.json { render :show, status: :ok, location: @reservation }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reservations/1 or /reservations/1.json
  def destroy
    @reservation.destroy!

    respond_to do |format|
      format.html { redirect_to reservations_url, notice: "Reservation was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def reservation_params
      params.require(:reservation).permit(:checking_date, :checkout_date, :user_notes, :is_refunded, :reservation_state_id)
    end

    def initialize_reservation_service
      @reservation_service = ReservationService.new
    end
end
