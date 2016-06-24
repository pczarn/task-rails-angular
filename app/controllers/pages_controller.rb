class PagesController < ApplicationController
  def home
    @orders = Order.all
  end
end
