json.array!(@orders) do |order|
  json.extract! order, :id, :name, :status, :finalized, :delivered
  json.url order_url(order, format: :json)
end
