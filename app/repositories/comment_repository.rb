

class CommentRepository

  def create_comment(comment, punctuation, user_id, room_id, is_legal)
    puts "entra"
    comment_created = Comment.create!(
      comment: comment,
      punctuation: punctuation,
      user_id: user_id,
      room_id: room_id,
      is_legal: is_legal
    )

    puts "Ante de traer comment"
    Comment.includes(room: :room_type).find_by(id: comment_created.id)
  end

end