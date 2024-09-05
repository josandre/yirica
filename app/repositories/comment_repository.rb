

class CommentRepository

  def create_comment(comment, punctuation, user_id, room_id, is_legal)
    Comment.create!(
      comment: comment,
      punctuation: punctuation,
      user_id: user_id,
      room_id: room_id,
      is_legal: is_legal
    )
  end

end