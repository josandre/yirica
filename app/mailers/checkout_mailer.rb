class CheckoutMailer < ApplicationMailer
  def bill_mail(user, bill, metadata)
    @user = user
    @bill = bill
    @metadata = metadata

    mail(to: @user.email, subject: 'Billing information') do |format|
      format.html {render layout: false}
    end
  end

  def reservation_mail(user, metadata, reservation)
    @user = user
    @reservation = reservation
    @metadata = metadata
    @state = reservation.reservation_state.state
    puts "state: #{ @state }"

    mail(to: @user.email, subject: 'Reservation information') do |format|
      format.html {render layout: false}
    end

  end

end