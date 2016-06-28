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
                    meals: [{
                        name: 'y',
                        price: 1.1
                    }],
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
            };
        }
        function fromJson(json) {
            var order = {
                id: json.id,
                name: json.name,
                status: STATUSES[json.status],
                meals: angular.copy(json['meals']) || [],
                added: json.created_at,
                show: true,
                canAddMeal: true,
                newMeal: {}
            };
            return order;
        }
        svc.getAll = function() {
            return $http.get('/orders.json').success(function(data) {
                for(var i=0; i<data.length; i++) {
                    svc.orders.push(fromJson(data[i]));
                }
            })
        };
        svc.create = function(order) {
            return $http.post('/orders.json', toJson(order)).success(function(data) {
                var order = fromJson(data);
                svc.orders.push(order);
            });
        };
        svc.createMeal = function(order, meal, user) {
            return $http.post('/orders/' + order.id + '/meals.json', meal).success(function(data) {
                data.user = user;
                order.meals.push(data);
            });
        };
        svc.updateStatus = function(order) {
            $http.put('/orders/' + order.id + '.json', {status: order.status.id});
        };

        return svc;
    }
]);
