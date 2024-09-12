class AdminController < ApplicationController
  load_and_authorize_resource
  before_action :authenticate_admin!
  before_action :initialize_services



  private

  def initialize_services
    @cancel_request_service = CancelRequestService.new
    @user_service = UserService.new
    @reservations_service = ReservationService.new
    @room_type_service = RoomTypeServiceRe.new
    @room_service = RoomService.new
    @reservation_states_service = ReservationStateService.new
    @stripe_service = StripeService.new
    @comment_service = CommentService.new
    @response_service = ResponseService.new
  end

  def authenticate_admin!
    unless current_user.administrator?
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end