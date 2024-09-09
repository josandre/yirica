class Admin::ReservationsController < AdminController


  # GET /admin/reservations
  def index
    json_response = @reservations_service.get_reservations
    render json: json_response, status: json_response[:status_code]
  end
end