// TODO cleanup: write 'MainController as ...'?

var app = angular.module('assignment', ['ui.router', 'angularMoment']);

app.constant('STATUSES', {
    active: {id: 'active', name: 'Active', categoryId: 0},
    finalized: {id: 'finalized', name: 'Finalized', categoryId: 1},
    ordered: {id: 'ordered', name: 'Ordered', categoryId: 1},
    delivered: {id: 'delivered', name: 'Delivered', categoryId: 1}
});
app.constant('CATEGORIES', [
    {name: 'Open', defaultStatusId: 'active'},
    {name: 'Archived', defaultStatusId: 'finalized'}
]);
