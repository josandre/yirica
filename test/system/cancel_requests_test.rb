require "application_system_test_case"

class CancelRequestsTest < ApplicationSystemTestCase
  setup do
    @cancel_request = cancel_requests(:one)
  end

  test "visiting the index" do
    visit cancel_requests_url
    assert_selector "h1", text: "Cancel requests"
  end

  test "should create cancel request" do
    visit cancel_requests_url
    click_on "New cancel request"

    fill_in "Date", with: @cancel_request.date
    check "Is confirmed" if @cancel_request.is_confirmed
    fill_in "Reason", with: @cancel_request.reason
    fill_in "Reservation", with: @cancel_request.reservation_id
    click_on "Create Cancel request"

    assert_text "Cancel request was successfully created"
    click_on "Back"
  end

  test "should update Cancel request" do
    visit cancel_request_url(@cancel_request)
    click_on "Edit this cancel request", match: :first

    fill_in "Date", with: @cancel_request.date
    check "Is confirmed" if @cancel_request.is_confirmed
    fill_in "Reason", with: @cancel_request.reason
    fill_in "Reservation", with: @cancel_request.reservation_id
    click_on "Update Cancel request"

    assert_text "Cancel request was successfully updated"
    click_on "Back"
  end

  test "should destroy Cancel request" do
    visit cancel_request_url(@cancel_request)
    click_on "Destroy this cancel request", match: :first

    assert_text "Cancel request was successfully destroyed"
  end
end
