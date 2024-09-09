class Admin::CancelRequestController < AdminController


  # GET /admin/cancel_requests
  def index
    json_response = @cancel_request_service.get_all_cancel_requests
    render json: json_response, status: json_response[:status_code]
  end



end