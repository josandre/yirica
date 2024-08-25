require "test_helper"

class ReservationRoomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reservation_room = reservation_rooms(:one)
  end

  test "should get index" do
    get reservation_rooms_url
    assert_response :success
  end

  test "should get new" do
    get new_reservation_room_url
    assert_response :success
  end

  test "should create reservation_room" do
    assert_difference("ReservationRoom.count") do
      post reservation_rooms_url, params: { reservation_room: { reservation_id: @reservation_room.reservation_id, room_id: @reservation_room.room_id } }
    end

    assert_redirected_to reservation_room_url(ReservationRoom.last)
  end

  test "should show reservation_room" do
    get reservation_room_url(@reservation_room)
    assert_response :success
  end

  test "should get edit" do
    get edit_reservation_room_url(@reservation_room)
    assert_response :success
  end

  test "should update reservation_room" do
    patch reservation_room_url(@reservation_room), params: { reservation_room: { reservation_id: @reservation_room.reservation_id, room_id: @reservation_room.room_id } }
    assert_redirected_to reservation_room_url(@reservation_room)
  end

  test "should destroy reservation_room" do
    assert_difference("ReservationRoom.count", -1) do
      delete reservation_room_url(@reservation_room)
    end

    assert_redirected_to reservation_rooms_url
  end
end
