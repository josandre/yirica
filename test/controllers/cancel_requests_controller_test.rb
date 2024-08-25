require "test_helper"

class CancelRequestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cancel_request = cancel_requests(:one)
  end

  test "should get index" do
    get cancel_requests_url
    assert_response :success
  end

  test "should get new" do
    get new_cancel_request_url
    assert_response :success
  end

  test "should create cancel_request" do
    assert_difference("CancelRequest.count") do
      post cancel_requests_url, params: { cancel_request: { date: @cancel_request.date, is_confirmed: @cancel_request.is_confirmed, reason: @cancel_request.reason, reservation_id: @cancel_request.reservation_id } }
    end

    assert_redirected_to cancel_request_url(CancelRequest.last)
  end

  test "should show cancel_request" do
    get cancel_request_url(@cancel_request)
    assert_response :success
  end

  test "should get edit" do
    get edit_cancel_request_url(@cancel_request)
    assert_response :success
  end

  test "should update cancel_request" do
    patch cancel_request_url(@cancel_request), params: { cancel_request: { date: @cancel_request.date, is_confirmed: @cancel_request.is_confirmed, reason: @cancel_request.reason, reservation_id: @cancel_request.reservation_id } }
    assert_redirected_to cancel_request_url(@cancel_request)
  end

  test "should destroy cancel_request" do
    assert_difference("CancelRequest.count", -1) do
      delete cancel_request_url(@cancel_request)
    end

    assert_redirected_to cancel_requests_url
  end
end
