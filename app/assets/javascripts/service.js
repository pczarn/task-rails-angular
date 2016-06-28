var app = angular.module('assignment');

app.factory('orders', [
    '$http',
    'STATUSES',
    function($http, STATUSES) {
        // define functions
        function toJson(order) {
            return {
                name: order.name,
                status: order.status.id,
                created_at: order.created_at,
            };
        }
        function fromJson(json) {
            var order = {
                id: json.id,
                name: json.name,
                status: STATUSES[json.status],
                // probably no need for copying
                meals: angular.copy(json['meals']) || [],
                created_at: json.created_at,
                show: true,
                canAddMeal: true,
                newMeal: {}
            };
            return order;
        }

        // build service
        var svc = {
            orders: []
        };
        svc.getAll = function() {
            return $http.get('/orders.json').success(function(data) {
                for(var i=0; i<data.length; i++) {
                    svc.orders.push(fromJson(data[i]));
                }
            })
        };
        svc.createOrder = function(order) {
            $http.post('/orders.json', toJson(order)).success(function(data) {
                var order = fromJson(data);
                svc.orders.push(order);
            })
            .error(function() {
                svc.orders = [];
            });
        };
        svc.createMeal = function(order, meal, currentUser) {
            $http.post('/orders/' + order.id + '/meals.json', meal).success(function(meal) {
                meal.user = currentUser;
                order.meals.push(meal);
            })
            .error(function() {
                order.meals = [];
            });
        };
        svc.updateStatus = function(order) {
            $http.put('/orders/' + order.id + '.json', {status: order.status.id});
        };

        return svc;
    }
]);
