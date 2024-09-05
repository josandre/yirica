class CommentService
  include ComprehendHelper

  def initialize
    @comment_repository = CommentRepository.new
  end

  def create(comment, punctuation, user_id, room_id)
    begin
      is_legal = check_if_comment_is_legal(comment)
      puts "is legal? #{is_legal}"
      comment = @comment_repository.create_comment(comment, punctuation, user_id, room_id, is_legal)
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


  private
  def check_if_comment_is_legal(comment)
    sentiment = detect_sentiment(comment)
    puts "sentiment: #{sentiment}"
    sentiment == 'NEUTRAL' || sentiment == 'POSITIVE'
  end
end