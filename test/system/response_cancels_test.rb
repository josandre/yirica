require "application_system_test_case"

class ResponseCancelsTest < ApplicationSystemTestCase
  setup do
    @response_cancel = response_cancels(:one)
  end

  test "visiting the index" do
    visit response_cancels_url
    assert_selector "h1", text: "Response cancels"
  end

  test "should create response cancel" do
    visit response_cancels_url
    click_on "New response cancel"

    fill_in "Cancel request", with: @response_cancel.cancel_request_id
    fill_in "Date", with: @response_cancel.date
    check "Is refunded" if @response_cancel.is_refunded
    fill_in "Refund information", with: @response_cancel.refund_information
    fill_in "Response", with: @response_cancel.response
    click_on "Create Response cancel"

    assert_text "Response cancel was successfully created"
    click_on "Back"
  end

  test "should update Response cancel" do
    visit response_cancel_url(@response_cancel)
    click_on "Edit this response cancel", match: :first

    fill_in "Cancel request", with: @response_cancel.cancel_request_id
    fill_in "Date", with: @response_cancel.date
    check "Is refunded" if @response_cancel.is_refunded
    fill_in "Refund information", with: @response_cancel.refund_information
    fill_in "Response", with: @response_cancel.response
    click_on "Update Response cancel"

    assert_text "Response cancel was successfully updated"
    click_on "Back"
  end

  test "should destroy Response cancel" do
    visit response_cancel_url(@response_cancel)
    click_on "Destroy this response cancel", match: :first

    assert_text "Response cancel was successfully destroyed"
  end
end
