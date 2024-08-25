require "test_helper"

class ReservationStatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reservation_state = reservation_states(:one)
  end

  test "should get index" do
    get reservation_states_url
    assert_response :success
  end

  test "should get new" do
    get new_reservation_state_url
    assert_response :success
  end

  test "should create reservation_state" do
    assert_difference("ReservationState.count") do
      post reservation_states_url, params: { reservation_state: { state: @reservation_state.state } }
    end

    assert_redirected_to reservation_state_url(ReservationState.last)
  end

  test "should show reservation_state" do
    get reservation_state_url(@reservation_state)
    assert_response :success
  end

  test "should get edit" do
    get edit_reservation_state_url(@reservation_state)
    assert_response :success
  end

  test "should update reservation_state" do
    patch reservation_state_url(@reservation_state), params: { reservation_state: { state: @reservation_state.state } }
    assert_redirected_to reservation_state_url(@reservation_state)
  end

  test "should destroy reservation_state" do
    assert_difference("ReservationState.count", -1) do
      delete reservation_state_url(@reservation_state)
    end

    assert_redirected_to reservation_states_url
  end
end
