class Order < ActiveRecord::Base
  has_many :meals

  enum status: [:active, :finalized, :ordered, :delivered]
  validates :name, length: { maximum: 150, too_long: "too long" }, presence: true

  devise :omniauthable, :omniauth_providers => [:google, :github]
end
