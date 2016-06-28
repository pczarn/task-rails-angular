var app = angular.module('assignment');

app.controller('Main', [
    '$scope',
    'orders',
    'CATEGORIES',
    'STATUSES',
    function($scope, svc, CATEGORIES, STATUSES) {
        $scope.category = function(elem) {
            return elem.status.categoryId == $scope.activeTab;
        };
        $scope.setTab = function(idx) {
            $scope.activeTab = idx;
        };
        $scope.addOrder = function() {
            if(!$scope.newOrder.name || $scope.newOrder.name === '') {
                return;
            }
            var statusId = CATEGORIES[$scope.activeTab].defaultStatusId;
            svc.create({
                name: $scope.newOrder.name,
                meals: [],
                added: new Date(),
                status: STATUSES[statusId]
            });
            $scope.newOrder = {};
        };
        $scope.setStatus = function(order, status) {
            order.status = status;
        };
        $scope.hasStatus = function(order, status) {
            return order.status.id == status.id;
        };
        $scope.addMeal = function(order) {
            if(!order.newMeal.name || order.newMeal.name === '') {
                return;
            }
            order.meals.push(order.newMeal);
            order.newMeal = {};
        };
        $scope.categories = CATEGORIES;
        $scope.statuses = STATUSES;
        $scope.newOrder = {};
        // Lists of orders.
        // don't clone. it's a shared reference.
        $scope.orders = svc.orders;
        $scope.setTab(0);
    }
]);
