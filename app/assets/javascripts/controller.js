var app = angular.module('assignment');

app.factory('orders', [
    function() {
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

        return svc;
    }
]);
