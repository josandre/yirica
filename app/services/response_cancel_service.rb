class ResponseCancelService

  def initialize
    @response_cancel_repository = ResponseCancelRepository.new

  end


  def create_response_cancel_reservation(response, refund_information, is_refunded, cancel_request_id)
       @response_cancel_repository.create_response_cancel_reservation(response, refund_information, is_refunded, cancel_request_id)
  end
end