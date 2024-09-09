class CommentsJob < ApplicationJob
  queue_as :default

  def perform(user, comment, admin, is_legal)
    Rails.logger.info "comment*** #{comment.as_json} at #{Time.current}"
    CommentsMailer.admin_comment_notification(user, comment, admin, is_legal).deliver_now
    Rails.logger.info "CommentsJob finished for User: #{user} at #{Time.current}"
  end


end

