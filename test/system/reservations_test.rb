require "application_system_test_case"

class ReservationsTest < ApplicationSystemTestCase
  setup do
    @reservation = reservations(:one)
  end

  test "visiting the index" do
    visit reservations_url
    assert_selector "h1", text: "Reservations"
  end

  test "should create reservation" do
    visit reservations_url
    click_on "New reservation"

    fill_in "Checking date", with: @reservation.checking_date
    fill_in "Checkout date", with: @reservation.checkout_date
    check "Is refunded" if @reservation.is_refunded
    fill_in "Reservation state", with: @reservation.reservation_state_id
    fill_in "User notes", with: @reservation.user_notes
    click_on "Create Reservation"

    assert_text "Reservation was successfully created"
    click_on "Back"
  end

  test "should update Reservation" do
    visit reservation_url(@reservation)
    click_on "Edit this reservation", match: :first

    fill_in "Checking date", with: @reservation.checking_date
    fill_in "Checkout date", with: @reservation.checkout_date
    check "Is refunded" if @reservation.is_refunded
    fill_in "Reservation state", with: @reservation.reservation_state_id
    fill_in "User notes", with: @reservation.user_notes
    click_on "Update Reservation"

    assert_text "Reservation was successfully updated"
    click_on "Back"
  end

  test "should destroy Reservation" do
    visit reservation_url(@reservation)
    click_on "Destroy this reservation", match: :first

    assert_text "Reservation was successfully destroyed"
  end
end
