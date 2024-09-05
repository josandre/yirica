class CommentService

  def initialize
    @comment_repository = CommentRepository.new
  end

  def create(comment, punctuation, user_id, room_id)
    begin
      comment = @comment_repository.create_comment(comment, punctuation, user_id, room_id)
      {
        status: { code: 200, message: 'Comment created successfully.' },
        data: comment.as_json,
        status_code: :ok
      }
    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while creating the comment.', error: e.message },
        status_code: :internal_server_error
      }
    end

  end
end