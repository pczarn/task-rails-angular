class Order < ActiveRecord::Base
  has_many :meals

  enum status: [:active, :finalized, :ordered, :delivered]
  validates :name, length: { maximum: 150, too_long: "too long" }, presence: true

  devise :omniauthable, :omniauth_providers => [:google, :github]

  def as_json(options = {})
    # Include meals and their owners.
    # [{id: 1, meals: [{id: 1, user: {email: x}}]}, ...]
    user = {user: {only: :email}}
    meals = {meals: {include: :user}}
    super(options.merge(include: meals))
  end
end
