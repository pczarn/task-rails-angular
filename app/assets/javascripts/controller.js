var app = angular.module('assignment');

app.controller('Main', [
    '$scope',
    'orders',
    function($scope, svc) {
        $scope.categories = ['Open', 'Archived'];
        $scope.statuses = [
            {id: 'active', name: 'Active'},
            {id: 'finalized', name: 'Finalized'},
            {id: 'ordered', name: 'Ordered'},
            {id: 'delivered', name: 'Delivered'}
        ];
        $scope.setTab = function(idx) {
            if($scope.activeTab != idx) {
                // shared reference.
                $scope.orders = $scope.ordersByStatus[idx];
            }
            $scope.activeTab = idx;
        };
        $scope.newOrder = {};
        $scope.addOrder = function() {
            if(!$scope.newOrder.name || $scope.newOrder.name === '') {
                return;
            }
            svc.create({
                name: $scope.newOrder.name,
                meals: [],
                added: new Date(),
                status: $scope.activeTab == 0 ? 'active' : 'finalized'
            });
            $scope.newOrder = {};
        };
        $scope.finalize = function(order) {
            var orderIdx = $scope.orders.indexOf(order);
            $scope.ordersByStatus[1].push(order);
            $scope.orders.splice(orderIdx, 1);
        };
        $scope.setStatus = function(order, status) {
            order.status = status.id;
        };
        $scope.hasStatus = function(order, status) {
            return order.status == status.id;
        };
        $scope.addMeal = function(order) {
            if(!order.newMeal.name || order.newMeal.name === '') {
                return;
            }
            order.meals.push(order.newMeal);
            order.newMeal = {};
        };
        // don't clone. it's a shared reference.
        $scope.ordersByStatus = svc.ordersByStatus;
        $scope.setTab(0);
    }
]);
