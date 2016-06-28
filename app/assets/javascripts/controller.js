var app = angular.module('assignment');

app.controller('Main', [
    '$scope',
    '$timeout',
    'orders',
    'CATEGORIES',
    'STATUSES',
    function($scope, $timeout, svc, CATEGORIES, STATUSES) {
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
            for(var i=0; i<$scope.orders.length; i++) {
                if($scope.orders[i].name == $scope.newOrder.name) {
                    // duplicate name
                    $scope.newOrderError = true;
                    $timeout(function () { $scope.newOrderError = false; }, 4000);
                    return;
                }
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
            svc.updateStatus(order);
        };
        $scope.hasStatus = function(order, status) {
            return order.status.id == status.id;
        };
        $scope.addMeal = function(order) {
            if(!order.newMeal.name || order.newMeal.name === '') {
                return;
            }
            for(var i=0; i<order.meals.length; i++) {
                if(order.meals[i].user.email == $scope.currentUser.email) {
                    order.error = true;
                    $timeout(function () { order.error = false; }, 4000);
                    return;
                }
            }
            svc.createMeal(order, order.newMeal, $scope.currentUser);
            order.newMeal = {};
        };
        $scope.categories = CATEGORIES;
        $scope.statuses = STATUSES;
        $scope.newOrder = {};
        // Lists of orders.
        // don't clone. it's a shared reference.
        $scope.orders = svc.orders;
        $scope.setTab(0);
        // Defined globally in layout
        $scope.currentUser = {email: window.appCurrentUserEmail};
        // Load all orders.
        svc.getAll();
    }
]);
