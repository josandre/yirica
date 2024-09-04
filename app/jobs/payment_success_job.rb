

class PaymentSuccessJob < ApplicationJob
  queue_as :default

  def perform(user, reservation_info, rooms, metadata, total, search_code, payment_id)
    Rails.logger.info "PaymentSuccessJob started for User: #{user} at #{Time.current}"
    reservation_service = ReservationService.new
    reservation, bill = reservation_service.create_reservation(user, metadata,  reservation_info, rooms, total, search_code, payment_id)
    CheckoutMailer.bill_mail(user, bill, metadata ).deliver_now
    CheckoutMailer.reservation_mail(user, metadata, reservation, search_code).deliver_now
    Rails.logger.info "PaymentSuccessJob finished for User: #{user} at #{Time.current}"
  end


end
