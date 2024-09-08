class CheckoutMailer < ApplicationMailer
  def bill_mail(user, bill, metadata)
    @user = user
    @bill = bill
    @metadata = metadata

    mail(to: @user.email, subject: 'Billing information') do |format|
      format.html {render layout: false}
    end
  end

  def reservation_mail(user, metadata, reservation, search_code)
    @user = user
    @reservation = reservation
    @metadata = metadata
    @state = reservation.reservation_state.state
    @search_code = search_code

    mail(to: @user.email, subject: 'Reservation information') do |format|
      format.html {render layout: false}
    end
  end

  def reservation_admin_mail(user, metadata, reservation, admin)
    @user = user
    @reservation = reservation
    @metadata = metadata
    @state = reservation.reservation_state.state
    @admin = admin

    mail(to: admin.email, subject: 'Reservation created') do |format|
      format.html {render layout: false}
    end
  end

end