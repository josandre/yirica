class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    puts "email #{@user.email}"
    mail(to: @user.email, subject: 'Welcome to Yiri ca hotel')
  end
end
