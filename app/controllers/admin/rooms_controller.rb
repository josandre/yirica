class Admin::RoomsController < AdminController


  # GET /admin/rooms
  def index
    json_response = @room_service.get_all_rooms
    render json: json_response, status: json_response[:status_code]
  end


  # POST /admin/rooms
  def create
    adult_price = room_params[:adult_price]
    kids_price = room_params[:kids_price]
    number = room_params[:number]
    location = room_params[:location]
    room_type_id = room_params[:room_type_id]
    is_beachfront = room_params[:is_beachfront]
    sqm = room_params[:sqm]
    bathrooms = room_params[:bathrooms]
    beds = room_params[:beds]
    body = JSON.parse(request.raw_post)
    image = body['room']['image']

    json_response = @room_service.create(adult_price, kids_price, number, location, room_type_id, is_beachfront, sqm, bathrooms, beds, image)
    render json: json_response, status: json_response[:status_code]
  end

  # PUT /admin/rooms
  def update
    puts "entra"
    adult_price = room_params[:adult_price]
    kids_price = room_params[:kids_price]
    number = room_params[:number]
    location = room_params[:location]
    room_type_id = room_params[:room_type_id]
    is_beachfront = room_params[:is_beachfront]
    sqm = room_params[:sqm]
    bathrooms = room_params[:bathrooms]
    beds = room_params[:beds]
    body = JSON.parse(request.raw_post)
    image = body['room']['image']
    room_id = params[:id]
    puts "id #{room_id}"

    json_response = @room_service.update_room(room_id, adult_price, kids_price, number, location, room_type_id, is_beachfront, sqm, bathrooms, beds, image)
    render json: json_response, status: json_response[:status_code]
  end

  private
  def room_params
    params.require(:room).permit(:adult_price, :kids_price, :number, :location, :room_type_id, :is_beachfront, :sqm, :bathrooms, :beds)
  end

end