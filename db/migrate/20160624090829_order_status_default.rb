class OrderStatusDefault < ActiveRecord::Migration
  def change
    change_column_default :orders, :status, 0
  end
end
