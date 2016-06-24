class PagesController < ApplicationController
  def home
    @active = Order.active
    @finalized = Order.where(status: [:finalized, :ordered])
    @delivered = Order.delivered
  end
end
