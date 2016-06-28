json.extract! @meal, :id, :name, :price, :order_id, :user_id
if @meal.user
  json.user do
    json.extract! @meal.user, :email
  end
end
