class CommentService
  include ComprehendHelper

  def initialize
    @comment_repository = CommentRepository.new
    @user_repository = UserRepository.new
  end

  def create(comment, punctuation, user, room_id)
    begin
      is_legal = check_if_comment_is_legal(comment)
      admin = @user_repository.get_admin
      comment = @comment_repository.create_comment(comment, punctuation, user.id, room_id, is_legal)
      CommentsJob.perform_later(user, comment, admin, is_legal)
      {
        status: { code: 200, message: 'Comment created successfully.' },
        data: {
          id: comment.id,
          comment: comment.comment,
          punctuation: comment.punctuation,
          is_legal: is_legal,
          user: {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            email: user.email
          }
        },
        status_code: :ok
      }

    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while creating the comment.', error: e.message },
        status_code: :internal_server_error
      }
    end

  end


  private
  def check_if_comment_is_legal(comment)
    sentiment = detect_sentiment(comment)
    sentiment == 'NEUTRAL' || sentiment == 'POSITIVE'
  end
end