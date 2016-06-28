// TODO cleanup: write 'MainController as ...'?

var app = angular.module('assignment', ['ui.router', 'templates', 'angularMoment']);

app.constant('STATUSES', {
    active: {id: 'active', name: 'Activate', categoryId: 0},
    finalized: {id: 'finalized', name: 'Finalized', categoryId: 1},
    ordered: {id: 'ordered', name: 'Ordered', categoryId: 1},
    delivered: {id: 'delivered', name: 'Delivered', categoryId: 1}
});
app.constant('CATEGORIES', [
    {name: 'Open', link: '#/active', defaultStatusId: 'active'},
    {name: 'Archived', link: '#/archived', defaultStatusId: 'finalized'}
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('active', {
            url: '/active',
            // doesn't work without assets/
            templateUrl: 'assets/templates/_active.html',
            tabId: 0
        })
        .state('archived', {
            url: '/archived',
            templateUrl: 'assets/templates/_archived.html',
            tabId: 1
        });

        $urlRouterProvider.when('', '/active');
    }
])
