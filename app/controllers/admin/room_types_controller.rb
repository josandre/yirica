class Admin::RoomTypesController < AdminController


  # GET /admin/room_types
  def index
    json_response = @room_type_service.get_all_room_types
    render json: json_response, status: json_response[:status_code]
  end
end