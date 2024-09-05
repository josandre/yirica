class ApplicationController < ActionController::Base

  before_action :authenticate_request, except: [:create]

  rescue_from CanCan::AccessDenied do |exception|
    Rails.logger.info "Access Denied: #{exception.action} on #{exception.subject}"
    render json: { error: 'Access denied!' }, status: :forbidden
  end

  def authenticate_request
    return if controller_name == 'client_app' && action_name == 'client_app'
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = JWT.decode(token, Rails.application.credentials.devise_jwt_secret_key!).first
    @current_user = User.find(decoded_token['sub'])

  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[:name, :last_name, :phone])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[:name, :last_name, :phone])
  end

end
