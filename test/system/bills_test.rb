require "application_system_test_case"

class BillsTest < ApplicationSystemTestCase
  setup do
    @bill = bills(:one)
  end

  test "visiting the index" do
    visit bills_url
    assert_selector "h1", text: "Bills"
  end

  test "should create bill" do
    visit bills_url
    click_on "New bill"

    fill_in "Discount", with: @bill.discount
    fill_in "Refund price", with: @bill.refund_price
    fill_in "Reservation", with: @bill.reservation_id
    fill_in "Room price", with: @bill.room_price
    fill_in "Taxes", with: @bill.taxes
    fill_in "Total", with: @bill.total
    click_on "Create Bill"

    assert_text "Bill was successfully created"
    click_on "Back"
  end

  test "should update Bill" do
    visit bill_url(@bill)
    click_on "Edit this bill", match: :first

    fill_in "Discount", with: @bill.discount
    fill_in "Refund price", with: @bill.refund_price
    fill_in "Reservation", with: @bill.reservation_id
    fill_in "Room price", with: @bill.room_price
    fill_in "Taxes", with: @bill.taxes
    fill_in "Total", with: @bill.total
    click_on "Update Bill"

    assert_text "Bill was successfully updated"
    click_on "Back"
  end

  test "should destroy Bill" do
    visit bill_url(@bill)
    click_on "Destroy this bill", match: :first

    assert_text "Bill was successfully destroyed"
  end
end
