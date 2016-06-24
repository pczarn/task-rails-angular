class Meal < ActiveRecord::Base
  belongs_to :order
  belongs_to :user

  validates :name, length: { maximum: 150, too_long: "too long" }, presence: true
end
