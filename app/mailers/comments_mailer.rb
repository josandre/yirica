class CommentsMailer < ApplicationMailer
  def admin_comment_notification(user, comment, admin, is_legal)
    @user = user
    @comment = comment
    @admin = admin
    @is_legal = is_legal
    @room = comment.room
    @room_type = @room.room_type

    mail(to: @admin.email, subject: 'New comment about a room') do |format|
      format.html {render layout: false}
    end
  end
end