require "application_system_test_case"

class RoomsTest < ApplicationSystemTestCase
  setup do
    @room = rooms(:one)
  end

  test "visiting the index" do
    visit rooms_url
    assert_selector "h1", text: "Rooms"
  end

  test "should create room" do
    visit rooms_url
    click_on "New room"

    fill_in "Adult price", with: @room.adult_price
    fill_in "Kids price", with: @room.kids_price
    fill_in "Location", with: @room.location
    fill_in "Number", with: @room.number
    fill_in "Room type", with: @room.room_type_id
    fill_in "Usage amount", with: @room.usage_amount
    click_on "Create Room"

    assert_text "Room was successfully created"
    click_on "Back"
  end

  test "should update Room" do
    visit room_url(@room)
    click_on "Edit this room", match: :first

    fill_in "Adult price", with: @room.adult_price
    fill_in "Kids price", with: @room.kids_price
    fill_in "Location", with: @room.location
    fill_in "Number", with: @room.number
    fill_in "Room type", with: @room.room_type_id
    fill_in "Usage amount", with: @room.usage_amount
    click_on "Update Room"

    assert_text "Room was successfully updated"
    click_on "Back"
  end

  test "should destroy Room" do
    visit room_url(@room)
    click_on "Destroy this room", match: :first

    assert_text "Room was successfully destroyed"
  end
end
