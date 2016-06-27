var app = angular.module('assignment');

app.factory('orders', [
	'$resource',
	'$http',
    function($resource, $http) {
        //var svc = $resource('/orders', [], {"update": {"method": "PATCH"}});
        //svc.create = function(attrs, successHandler) {
        //};
        var svc = {
            ordersByState: [
                // active
                [{
                    name: 'x',
                    meals: [],
                    added: new Date(),
                    show: true,
                    state: 'finalized'
                }],
                [],
                []
            ]
        };
        svc.getAll = function() {
        	return $http.get('/orders').success(function(data) {
        		angular.copy(data, svc.orders);
        	})
        };

        return svc;
    }
]);
