class ResponseRepository


  def create_response(response_text, user_id, comment_id)
    Response.create!(
      response: response_text,
      user_id: user_id,
      comment_id: comment_id,
    )
  end
end