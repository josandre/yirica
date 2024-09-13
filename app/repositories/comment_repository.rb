

class CommentRepository

  def create_comment(comment, punctuation, user_id, room_id, is_legal)
    comment_created = Comment.create!(
      comment: comment,
      punctuation: punctuation,
      user_id: user_id,
      room_id: room_id,
      is_legal: is_legal
    )
    Comment.includes(room: :room_type).find_by(id: comment_created.id)
  end


  def get_all_comments
    Comment.all.includes(:user, :response, room: :room_type)
  end


  def get_comment_by_id(comment_id)
    Comment.find(comment_id)
  end

end