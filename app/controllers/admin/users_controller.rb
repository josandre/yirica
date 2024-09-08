class Admin::UsersController < AdminController


  # GET /admin/users
  def index
    json_response = @user_service.get_all_users
    render json: json_response, status: json_response[:status_code]
  end






end