

class ResponseJob < ApplicationJob
  queue_as :default

  def perform(user, response, comment)
    Rails.logger.info "PaymentSuccessJob started for User: #{user} at #{Time.current}"
    CommentsMailer.response_user_notification(user, response, comment).deliver_now
  end


end
