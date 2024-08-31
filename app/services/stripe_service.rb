

class StripeService

  def initialize
    @user_service = UserService.new
  end


  def payment_intend(user_id, reservation_info, rooms, metadata, total)
    user = @user_service.get_by_id(user_id)
    puts "total #{total}"
    flattened_metadata = flatten_metadata(metadata)
    begin
      @payment_intend = Stripe::PaymentIntent.create({
                                     amount: total,
                                     currency: 'usd',
                                     payment_method: 'pm_card_visa',
                                     confirm: true,
                                     description: "Yiri ca hotel reservation payment",
                                     metadata: flattened_metadata.merge({
                                                                          client: "#{user.name} #{user.last_name}",
                                                                          user_id: user.id
                                                                        }),
                                     automatic_payment_methods: {enabled: true, allow_redirects: "never"}
                                   })


      if @payment_intend.status == 'succeeded'
        PaymentSuccessJob.perform_later(user, reservation_info, rooms, metadata, total)
      end
      return @payment_intend
    rescue Stripe::StripeError => e
      raise e
    end
  end


  private
  def flatten_metadata(metadata)
    flattened_metadata = {}
    metadata.each_with_index do |meta, index|
      meta.each do |key, value|
        flattened_metadata["#{key}_#{index}"] = value.is_a?(Hash) ? value.to_json : value.to_s
      end
    end
    flattened_metadata
  end


end