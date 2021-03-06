class PagesController < ApplicationController
  before_action :authenticate_user!

  def home
    @active = Order.active
    @finalized = Order.where(status: [:finalized, :ordered])
    @delivered = Order.delivered

    # creating a new order
    @order = Order.new
    @meal = Meal.new
  end
end
