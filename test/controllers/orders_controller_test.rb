require 'test_helper'

class OrdersControllerTest < ActionController::TestCase
  setup do
    @order = orders(:one)
  end

  test "should get index" do
    get :index, format: :json
    assert_response :success
    assert_not_nil assigns(:orders)
  end

  test "should create order" do
    assert_difference('Order.count') do
      post :create, order: { delivered: @order.delivered, finalized: @order.finalized, name: @order.name, status: @order.status }
    end

    assert_redirected_to order_path(assigns(:order))
  end

  test "should update order" do
    patch :update, id: @order, order: { delivered: @order.delivered, finalized: @order.finalized, name: @order.name, status: @order.status }
    assert_redirected_to order_path(assigns(:order))
  end

  test "should destroy order" do
    assert_difference('Order.count', -1) do
      delete :destroy, id: @order
    end

    assert_redirected_to orders_path
  end
end
