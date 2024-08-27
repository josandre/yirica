class Users::PasswordsController < Devise::PasswordsController
  load_and_authorize_resource except: [:update]
  skip_before_action :authenticate_request, only: [:update]


  def update
    user = User.find_by(email: user_params[:email])
    puts "user #{user} user_params[:email]"

    if user
      new_password = generate_random_password
      if user.update(password: new_password, password_confirmation: new_password)
        UserMailer.password_reset(user, new_password).deliver_now
        render json: { message: 'Password updated successfully'}, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private
  def generate_random_password(length = 12)
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}|;:,.<>?'
    Array.new(length) { chars[rand(chars.length)] }.join
  end

  def user_params
    params.require(:user).permit(:email)
  end


end
