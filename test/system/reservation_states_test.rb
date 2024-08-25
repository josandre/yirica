require "application_system_test_case"

class ReservationStatesTest < ApplicationSystemTestCase
  setup do
    @reservation_state = reservation_states(:one)
  end

  test "visiting the index" do
    visit reservation_states_url
    assert_selector "h1", text: "Reservation states"
  end

  test "should create reservation state" do
    visit reservation_states_url
    click_on "New reservation state"

    fill_in "State", with: @reservation_state.state
    click_on "Create Reservation state"

    assert_text "Reservation state was successfully created"
    click_on "Back"
  end

  test "should update Reservation state" do
    visit reservation_state_url(@reservation_state)
    click_on "Edit this reservation state", match: :first

    fill_in "State", with: @reservation_state.state
    click_on "Update Reservation state"

    assert_text "Reservation state was successfully updated"
    click_on "Back"
  end

  test "should destroy Reservation state" do
    visit reservation_state_url(@reservation_state)
    click_on "Destroy this reservation state", match: :first

    assert_text "Reservation state was successfully destroyed"
  end
end
