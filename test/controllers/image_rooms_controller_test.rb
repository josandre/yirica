require "test_helper"

class ImageRoomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @image_room = image_rooms(:one)
  end

  test "should get index" do
    get image_rooms_url, as: :json
    assert_response :success
  end

  test "should create image_room" do
    assert_difference("ImageRoom.count") do
      post image_rooms_url, params: { image_room: { image: @image_room.image, is_principal: @image_room.is_principal } }, as: :json
    end

    assert_response :created
  end

  test "should show image_room" do
    get image_room_url(@image_room), as: :json
    assert_response :success
  end

  test "should update image_room" do
    patch image_room_url(@image_room), params: { image_room: { image: @image_room.image, is_principal: @image_room.is_principal } }, as: :json
    assert_response :success
  end

  test "should destroy image_room" do
    assert_difference("ImageRoom.count", -1) do
      delete image_room_url(@image_room), as: :json
    end

    assert_response :no_content
  end
end
