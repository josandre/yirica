require "test_helper"

class CheckoutControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get checkout_create_url
    assert_response :success
  end
end
