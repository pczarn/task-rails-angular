require 'test_helper'

class MealsControllerTest < ActionController::TestCase
  setup do
    @meal = meals(:one)
  end

  test "should create meal" do
    assert_difference('Meal.count') do
      post :create, meal: { name: @meal.name, order_id: @meal.order_id, price: @meal.price, user_id: @meal.user_id }
    end

    assert_redirected_to meal_path(assigns(:meal))
  end

  # test "should update meal" do
  #   patch :update, id: @meal, meal: { name: @meal.name, order_id: @meal.order_id, price: @meal.price, user_id: @meal.user_id }
  #   assert_redirected_to meal_path(assigns(:meal))
  # end

  # test "should destroy meal" do
  #   assert_difference('Meal.count', -1) do
  #     delete :destroy, id: @meal
  #   end

  #   assert_redirected_to meals_path
  # end
end
