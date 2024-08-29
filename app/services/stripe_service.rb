

class StripeService

  def initialize
    @user_service = UserService.new
  end


  def payment_intend(user_id)
    user = @user_service.get_by_id(user_id)
    begin
      @payment_intend = Stripe::PaymentIntent.create({
                                     amount: 2000,
                                     currency: 'usd',
                                     payment_method: 'pm_card_visa',
                                     confirm: true,
                                     description: "Yiri ca hotel reservation payment",
                                     metadata: {client: user.name + " " + user.last_name },
                                     automatic_payment_methods: {enabled: true, allow_redirects: "never"}
                                   })
      return @payment_intend
    rescue Stripe::StripeError => e
      raise e
    end
  end
end