class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :name
      t.integer :status
      t.datetime :finalized
      t.datetime :delivered

      t.timestamps null: false
    end
  end
end
