class ImageRoomsController < ApplicationController
  before_action :set_image_room, only: %i[ show update destroy ]

  # GET /image_rooms
  # GET /image_rooms.json
  def index
    @image_rooms = ImageRoom.all
  end

  # GET /image_rooms/1
  # GET /image_rooms/1.json
  def show
  end

  # POST /image_rooms
  # POST /image_rooms.json
  def create
    @image_room = ImageRoom.new(image_room_params)

    if @image_room.save
      render :show, status: :created, location: @image_room
    else
      render json: @image_room.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /image_rooms/1
  # PATCH/PUT /image_rooms/1.json
  def update
    if @image_room.update(image_room_params)
      render :show, status: :ok, location: @image_room
    else
      render json: @image_room.errors, status: :unprocessable_entity
    end
  end

  # DELETE /image_rooms/1
  # DELETE /image_rooms/1.json
  def destroy
    @image_room.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image_room
      @image_room = ImageRoom.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def image_room_params
      params.require(:image_room).permit(:image, :is_principal)
    end
end
