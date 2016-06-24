json.array!(@meals) do |meal|
  json.extract! meal, :id, :name, :price, :order_id, :user_id
  json.url meal_url(meal, format: :json)
end
