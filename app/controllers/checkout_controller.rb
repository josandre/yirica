class CheckoutController < ApplicationController
  before_action :initialize_stripe_service


  def create
    user_id = params[:user_id]
    reservation_info = reservation_params(params[:reservation])
    rooms = params[:rooms].map(&:to_i)
    metadata = metadata_array_params(params[:metadata])
    total = params[:total].to_i


    begin
      response = @stripe_service.payment_intend(user_id, reservation_info.to_h, rooms, metadata, total )

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

  def card_params(card)
    params.require(:card).permit(:number, :exp_month, :exp_year, :cvc)
  end

  def reservation_params(reservation)
    reservation.permit(:checkIn, :checkOut)
  end

  def metadata_array_params(metadata_array)
    metadata_array.map do |metadata|
      metadata.permit(:roomType, :kids, :adults, :totalAdults, :totalKids, :rooms, :roomId,  :total, reservation: [:checkIn, :checkOut]).to_h
    end

  end



end
