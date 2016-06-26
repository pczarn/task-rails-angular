// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require angular
//= require angular-ui-router
//= require moment/moment
//= require angular-moment/angular-moment
//= require bootstrap-sass-official/assets/javascripts/bootstrap
//= require_tree .

// TODO cleanup: assign the module to a var
// TODO cleanup: write 'Main as ...'?

angular.module('assignment', ['ui.router', 'angularMoment'])
    .factory('orders', [
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

angular.module('assignment')
    .controller('Main', [
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
