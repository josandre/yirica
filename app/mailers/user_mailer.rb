class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    puts "email #{@user.email}"
    mail(to: @user.email, subject: 'Welcome to Yiri ca hotel') do |format|
      format.html {render layout: false}
    end
  end


  def password_reset(user, new_password)
    @user = user
    @new_password = new_password
    mail(to:  @user.email, subject: 'Password Reset') do |format|
      format.html {render layout: false}
    end
  end

end
