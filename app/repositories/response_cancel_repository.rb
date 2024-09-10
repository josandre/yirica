class ResponseCancelRepository


  def create_response_cancel_reservation(response, refund_information, is_refunded, cancel_request_id)
    ResponseCancelRequest.create!(
      response: response,
      date: Time.now.utc,
      refund_information: refund_information,
      is_refunded: is_refunded,
      cancel_request_id: cancel_request_id
    )

  end
end