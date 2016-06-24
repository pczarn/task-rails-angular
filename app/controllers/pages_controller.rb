class PagesController < ApplicationController
  def home
    @active = Order.where(status: :active)
    @finalized = Order.where(status: [:finalized, :ordered])
    @delivered = Order.where(status: :delivered)
  end
end
