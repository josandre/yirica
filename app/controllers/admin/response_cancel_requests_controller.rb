class Admin::ResponseCancelRequestsController < AdminController



  # POST /admin/response_cancel_requests
  def create
    reservation_id = params[:reservation_id]
    response = params[:response]
    canceled_request_id = params[:cancel_request_id]
    json_response = @stripe_service.make_a_refund(reservation_id, canceled_request_id, response, @current_user)
    render json: json_response, status: json_response[:status_code]
  end

  private

  def response_cancel_request_params
    params.require(:response_cancel_request).permit(:reservation_id, :cancel_request_id, :response)
  end


end