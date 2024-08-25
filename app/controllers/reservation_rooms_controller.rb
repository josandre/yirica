class ReservationRoomsController < ApplicationController
  before_action :set_reservation_room, only: %i[ show edit update destroy ]

  # GET /reservation_rooms or /reservation_rooms.json
  def index
    @reservation_rooms = ReservationRoom.all
  end

  # GET /reservation_rooms/1 or /reservation_rooms/1.json
  def show
  end

  # GET /reservation_rooms/new
  def new
    @reservation_room = ReservationRoom.new
  end

  # GET /reservation_rooms/1/edit
  def edit
  end

  # POST /reservation_rooms or /reservation_rooms.json
  def create
    @reservation_room = ReservationRoom.new(reservation_room_params)

    respond_to do |format|
      if @reservation_room.save
        format.html { redirect_to reservation_room_url(@reservation_room), notice: "Reservation room was successfully created." }
        format.json { render :show, status: :created, location: @reservation_room }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @reservation_room.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reservation_rooms/1 or /reservation_rooms/1.json
  def update
    respond_to do |format|
      if @reservation_room.update(reservation_room_params)
        format.html { redirect_to reservation_room_url(@reservation_room), notice: "Reservation room was successfully updated." }
        format.json { render :show, status: :ok, location: @reservation_room }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @reservation_room.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reservation_rooms/1 or /reservation_rooms/1.json
  def destroy
    @reservation_room.destroy!

    respond_to do |format|
      format.html { redirect_to reservation_rooms_url, notice: "Reservation room was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation_room
      @reservation_room = ReservationRoom.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def reservation_room_params
      params.require(:reservation_room).permit(:room_id, :reservation_id)
    end
end
