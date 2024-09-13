class CancelReservationMailer < ApplicationMailer

  def cancel_request_mail_admin(reservation, user, admin, reason)
    @user = user
    @reservation = reservation
    @admin = admin
    @reason = reason

    mail(to: @admin.email, subject: 'Cancel reservation request') do |format|
      format.html {render layout: false}
    end
  end


  def response_to_cancel_request_reservation_user(response, date, refund_information, is_refunded, user)
    puts "email to user #{user.email}"
    @response = response
    @date = date
    @refund_information = refund_information
    @is_refunded = is_refunded
    @user = user

    mail(to: @user.email, subject: 'Cancel reservation response') do |format|
      format.html {render layout: false}
    end
  end


  def response_to_cancel_request_reservation_admin(response, date, refund_information, is_refunded, admin)
    puts "c #{admin.email}"
    @response = response
    @date = date
    @refund_information = refund_information
    @is_refunded = is_refunded
    @admin = admin

    mail(to: @admin.email, subject: 'Cancel reservation response') do |format|
      format.html {render layout: false}
    end
  end



end