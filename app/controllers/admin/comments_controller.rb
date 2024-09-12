class Admin::CommentsController < AdminController



  # GET /admin/comments
  def index
    json_response = @comment_service.get_comments
    render json: json_response, status: json_response[:status_code]
  end

end