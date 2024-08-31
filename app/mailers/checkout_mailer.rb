class CheckoutMailer < ApplicationMailer
  def bill_mail(user, bill, metadata)
    puts "bill #{bill}"
    @user = user
    @bill = bill
    @metadata = metadata

    mail(to: @user.email, subject: 'Billing information') do |format|
      format.html {render layout: false}
    end
  end

end