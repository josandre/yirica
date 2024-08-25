require "test_helper"

class ResponseCancelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @response_cancel = response_cancels(:one)
  end

  test "should get index" do
    get response_cancels_url
    assert_response :success
  end

  test "should get new" do
    get new_response_cancel_url
    assert_response :success
  end

  test "should create response_cancel" do
    assert_difference("ResponseCancel.count") do
      post response_cancels_url, params: { response_cancel: { cancel_request_id: @response_cancel.cancel_request_id, date: @response_cancel.date, is_refunded: @response_cancel.is_refunded, refund_information: @response_cancel.refund_information, response: @response_cancel.response } }
    end

    assert_redirected_to response_cancel_url(ResponseCancel.last)
  end

  test "should show response_cancel" do
    get response_cancel_url(@response_cancel)
    assert_response :success
  end

  test "should get edit" do
    get edit_response_cancel_url(@response_cancel)
    assert_response :success
  end

  test "should update response_cancel" do
    patch response_cancel_url(@response_cancel), params: { response_cancel: { cancel_request_id: @response_cancel.cancel_request_id, date: @response_cancel.date, is_refunded: @response_cancel.is_refunded, refund_information: @response_cancel.refund_information, response: @response_cancel.response } }
    assert_redirected_to response_cancel_url(@response_cancel)
  end

  test "should destroy response_cancel" do
    assert_difference("ResponseCancel.count", -1) do
      delete response_cancel_url(@response_cancel)
    end

    assert_redirected_to response_cancels_url
  end
end
