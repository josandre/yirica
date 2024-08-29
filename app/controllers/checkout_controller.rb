class CheckoutController < ApplicationController
  before_action :initialize_stripe_service


  def create
    user_id = params[:user_id]
    card = card_params
    begin
      response = @stripe_service.payment_intend(user_id)

      render json: {
        status: { code: 200, message: 'Payment method created' },
        payment_intent: response.status
      }, status: :ok

    rescue Stripe::StripeError => e
      render json: {
        status: { code: 400, message: e.message }
      }, status: :bad_request

    rescue StandardError => e
      render json: {
        status: { code: 500, message:  e.message }
      }, status: :internal_server_error
    end
  end


  private
  def initialize_stripe_service
    @stripe_service = StripeService.new
  end

  def card_params
    params.require(:card).permit(:number, :exp_month, :exp_year, :cvc)
  end

end
