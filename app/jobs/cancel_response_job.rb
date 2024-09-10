class CancelResponseJob < ApplicationJob
  queue_as :default

  def perform(response, date, refund_information, is_refunded, user, admin)
    Rails.logger.info "CancelResponseJob started for User: #{user} and Admin: #{admin} at #{Time.current}"
    begin
      CancelReservationMailer.response_to_cancel_request_reservation_user(response, date, refund_information, is_refunded, user).deliver_now
    rescue => e
      Rails.logger.error "Failed to send email to User: #{user.email}, error: #{e.message}"
    end

    begin
      CancelReservationMailer.response_to_cancel_request_reservation_admin(response, date, refund_information, is_refunded, admin).deliver_now
    rescue => e
      Rails.logger.error "Failed to send email to Admin: #{admin.email}, error: #{e.message}"
    end



    Rails.logger.info "CancelResponseJob finished for User: #{user} and Admin: #{admin} at #{Time.current}"
  end


end

