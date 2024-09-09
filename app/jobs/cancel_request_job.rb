class CancelRequestJob < ApplicationJob
  queue_as :default

  def perform(reservation, user, admin, reason)
    Rails.logger.info "CancelRequestjob started for Admin: #{user} at #{Time.current}"
    CancelReservationMailer.cancel_request_mail_admin(reservation, user, admin, reason).deliver_now
    Rails.logger.info "CancelRequestJob finished for Admin: #{user} at #{Time.current}"
  end


end