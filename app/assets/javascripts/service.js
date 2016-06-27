var app = angular.module('assignment');

app.factory('orders', [
    '$http',
    function($http) {
        //var svc = $resource('/orders', [], {"update": {"method": "PATCH"}});
        var svc = {
            ordersByStatus: [
                // active
                [{
                    name: 'x',
                    meals: [],
                    added: new Date(),
                    show: true,
                    status: 'finalized'
                }],
                [],
                []
            ]
        };
        function toJson(order) {
            return {
                name: order.name,
                status: order.status,
                finalized: order.added,
                delivered: null
            };
        }
        function fromJson(json) {
            return {
                id: json.id,
                name: json.name,
                status: json.status,
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
                svc.ordersByStatus[order.status == 'active'? 0 : 1].push(order);
            });
        };

        return svc;
    }
]);
