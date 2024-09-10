class Admin::ReservationStatesController < AdminController


  # GET /admin/reservation_states
  def index
    json_response = @reservation_states_service.get_all_state
    render json: json_response, status: json_response[:status_code]
  end
end