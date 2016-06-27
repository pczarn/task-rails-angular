var app = angular.module('assignment');

app.factory('orders', [
    '$http',
    'STATUSES',
    function($http, STATUSES) {
        var svc = {
            orders: [
                // active
                {
                    name: 'x',
                    meals: [],
                    added: new Date(),
                    show: true,
                    status: {id:'active', categoryId:0}
                }
            ]
        };
        function toJson(order) {
            return {
                name: order.name,
                status: order.status.id,
                created_at: order.added,
                delivered: null
            };
        }
        function fromJson(json) {
            return {
                id: json.id,
                name: json.name,
                status: STATUSES[json.status],
                meals: [],
                added: json.created_at,
                show: true,
                newMeal: {}
            };
        }
        svc.getAll = function() {
            return $http.get('/orders.json').success(function(data) {
                angular.copy(fromJson(data), svc.orders);
            })
        };
        svc.create = function(order) {
            return $http.post('/orders.json', toJson(order)).success(function(data) {
                var order = fromJson(data);
                svc.orders.push(order);
            });
        };

        return svc;
    }
]);
