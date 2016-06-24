class Order < ActiveRecord::Base
  enum status: [:active, :finalized, :ordered, :delivered]
  validates :name, length: { maximum: 150, too_long: "too long" }, presence: true
end
