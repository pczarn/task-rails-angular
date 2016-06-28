var app = angular.module('assignment');

app.controller('Main', [
    '$scope',
    '$timeout',
    'orderService',
    'CATEGORIES',
    'STATUSES',
    function($scope, $timeout, svc, CATEGORIES, STATUSES) {
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.activeTab = toState.tabId;
        });
        $scope.category = function(elem) {
            return elem.status.categoryId == $scope.activeTab;
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
            svc.createOrder({
                name: $scope.newOrder.name,
                meals: [],
                created_at: new Date(),
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
        // Defined globally in layout
        $scope.currentUser = {email: window.appCurrentUserEmail};
        // Load all orders.
        svc.getAllOrders();
        $scope.orders = svc.orders;
    }
]);
