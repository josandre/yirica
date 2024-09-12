class ResponseService

  def initialize
    @response_repository = ResponseRepository.new
    @user_service = UserService.new
    @comment_service = CommentService.new
  end


  def create_response(response_text, current_user_id, comment_id)
    begin
      comment = @comment_service.get_comment_by_id(comment_id)

      if comment
        response = @response_repository.create_response(response_text, current_user_id, comment_id)
        {
          status: { code: 200, message: 'Response created successfully.' },
          data: response.as_json(only: [:id, :response]),
          status_code: :ok
        }
      else
        {
          status: { code: 404, message: 'Comment not found.' },
          status_code: :not_found
        }
      end

    rescue => e
      {
        status: { code: 500, message: 'An error occurred while updating rooms.', error: e.message },
        status_code: :internal_server_error
      }
    end

  end
end