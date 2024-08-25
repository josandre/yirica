class RoomsController < ApplicationController
  load_and_authorize_resource except: [:most_used, :search]
  before_action :set_room, only: %i[ show edit update destroy ]
  before_action :initialize_room_service
  skip_before_action :authenticate_request, only: [:most_used, :search]


  def most_used
    @rooms = @room_service.most_used_rooms
    render json: @rooms.to_json(include: :room_type)
  end

  def search
    request_params = search_params
    check_in = request_params[:check_in].to_date
    check_out = request_params[:check_out].to_date
    adults = request_params[:adults].to_i
    children = request_params[:kids].to_i
    puts "params: #{request_params}"
    @available_rooms = @room_service.search_room_availability(check_in, check_out, adults, children)
    puts "result: #{@available_rooms}"
    render json: @available_rooms.to_json
  end



  def index
    @rooms = Room.all
  end


  def show
    render json: @room
  end

  # POST /rooms or /rooms.json
  def create
    @room = Room.new(room_params)

    if @room.save
      render :show, status: :created, location: @room
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rooms/1 or /rooms/1.json
  def update
    if @room.update(room_params)
      render :show, status: :ok, location: @room
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @room.destroy
    head :no_content
  end

  private

  def set_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:usage_amount, :adult_price, :kids_price, :number, :location, :room_type_id, :is_active, :is_beachfront)
  end

  def search_params
    params.permit(:check_in, :check_out, :adults, :kids)
  end

  def initialize_room_service
    @room_service = RoomService.new
  end
end
