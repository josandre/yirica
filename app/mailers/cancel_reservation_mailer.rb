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



end