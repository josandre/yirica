require "application_system_test_case"

class ReservationRoomsTest < ApplicationSystemTestCase
  setup do
    @reservation_room = reservation_rooms(:one)
  end

  test "visiting the index" do
    visit reservation_rooms_url
    assert_selector "h1", text: "Reservation rooms"
  end

  test "should create reservation room" do
    visit reservation_rooms_url
    click_on "New reservation room"

    fill_in "Reservation", with: @reservation_room.reservation_id
    fill_in "Room", with: @reservation_room.room_id
    click_on "Create Reservation room"

    assert_text "Reservation room was successfully created"
    click_on "Back"
  end

  test "should update Reservation room" do
    visit reservation_room_url(@reservation_room)
    click_on "Edit this reservation room", match: :first

    fill_in "Reservation", with: @reservation_room.reservation_id
    fill_in "Room", with: @reservation_room.room_id
    click_on "Update Reservation room"

    assert_text "Reservation room was successfully updated"
    click_on "Back"
  end

  test "should destroy Reservation room" do
    visit reservation_room_url(@reservation_room)
    click_on "Destroy this reservation room", match: :first

    assert_text "Reservation room was successfully destroyed"
  end
end
