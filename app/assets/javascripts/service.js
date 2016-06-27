var app = angular.module('assignment');

app.controller('Main', [
    '$scope',
    'orders',
    function($scope, svc) {
        $scope.states = ['Open', 'Archived'];
        $scope.setTab = function(idx) {
            if($scope.activeTab != idx) {
                // shared reference.
                $scope.orders = $scope.ordersByState[idx];
            }
            $scope.activeTab = idx;
        };
        $scope.newOrder = {};
        $scope.addOrder = function() {
            if(!$scope.newOrder.name || $scope.newOrder.name === '') {
                return;
            }
            $scope.orders.push({
                name: $scope.newOrder.name,
                meals: [],
                added: new Date(),
                newMeal: {},
                show: true,
                state: 'finalized'
            });
            $scope.newOrder = {};
        };
        $scope.finalize = function(order) {
            var orderIdx = $scope.orders.indexOf(order);
            $scope.ordersByState[1].push(order);
            $scope.orders.splice(orderIdx, 1);
        };
        $scope.setFinalized = function(order) {
            order.state = 'finalized';
        };
        $scope.setOrdered = function(order) {
            order.state = 'ordered';
        };
        $scope.setDelivered = function(order) {
            order.state = 'delivered';
        };
        $scope.isFinalized = function(order) {
            return order.state === 'finalized';
        };
        $scope.isOrdered = function(order) {
            return order.state === 'ordered';
        };
        $scope.isDelivered = function(order) {
            return order.state === 'delivered';
        };
        $scope.addMeal = function(order) {
            if(!order.newMeal.name || order.newMeal.name === '') {
                return;
            }
            order.meals.push(order.newMeal);
            order.newMeal = {};
        };
        // don't clone. it's a shared reference.
        $scope.ordersByState = svc.ordersByState;
        $scope.setTab(0);
    }
]);
