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


  def get_comments
    begin
      comments = @comment_repository.get_all_comments


      if comments.any?
        {
          status: { code: 200, message: 'Comment list retrieved successfully.' },
          data: comments.as_json(only: [:id, :comment, :punctuation, :is_legal, :created_at ],
          include: {
            user: {
              only: [:id, :email, :name, :last_name],
            },
            room: {
              only: [:id, :number],
              include:{
                room_type: {only: [:id, :name]},
              }
            }
          }),
        status_code: :ok
        }
      else
        {
          status: { code: 404, message: 'There is not comments available.'},
          status_code: :not_found
        }
      end
    rescue StandardError => e
      {
        status: { code: 500, message: 'An error occurred while retrieving the comment.', error: e.message },
        status_code: :internal_server_error
      }
    end
  end


  def get_comment_by_id(comment_id)
    @comment_repository.get_comment_by_id(comment_id)
  end


  private
  def check_if_comment_is_legal(comment)
    sentiment = detect_sentiment(comment)
    sentiment == 'NEUTRAL' || sentiment == 'POSITIVE'
  end
end