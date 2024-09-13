class Admin::ResponsesController < AdminController


  # POST /admin/responses
  def create
    response_text = comment_response_request_params[:message]
    comment_id = comment_response_request_params[:comment_id]
    current_user = @current_user

    json_response = @response_service.create_response(response_text, current_user.id,  comment_id)
    render json: json_response, status: json_response[:status_code]
  end

  private

  def comment_response_request_params
    params.require(:comment_response).permit(:message, :comment_id)
  end

end