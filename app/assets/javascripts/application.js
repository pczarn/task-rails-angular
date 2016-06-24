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
//= require_tree .

angular.module('assignment', ['ui.router'])
    .factory('orders', [
        function() {
            var svc = {
                orders: [{name: 'x', added: new Date()}]
            };

            return svc;
        }
    ]);

angular.module('assignment')
    .controller('Main', [
        '$scope',
        'orders',
        function($scope, svc) {
            $scope.test = 'first test.';
            $scope.addOrder = function() {
                if(!$scope.name || $scope.name === '') {
                    return;
                }
                $scope.orders.push({name: $scope.name, added: new Date()});
                $scope.name = '';
            };
            $scope.orders = svc.orders;

        }
    ]);
