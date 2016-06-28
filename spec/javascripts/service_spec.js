describe('the app service', function() {
    var orderName = "Test order active";
    var orderStatus = 'active';

    beforeEach(function() {
        angular.mock.module('assignment');

        var ordersService;
        angular.mock.inject(function getDeps(orders) {
            ordersService = orders;
        });
        this.svc = ordersService;
    });

    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('assets/templates/_active.html').respond("");
        var order;
        $httpBackend.whenPOST('/orders.json').respond(function(_, _, json) {
            order = JSON.parse(json);
            order.id = 1;
            json = JSON.stringify(order);
            console.log(order);
            return [201, json, {}];
        });
        $httpBackend.whenPUT('/orders/1.json').respond(function(_, _, json) {
            var obj = JSON.parse(json);
            for(var attr in obj) {
                order[attr] = obj[attr];
            }
            json = JSON.stringify(order);
            return [200, json, {}];
        });
        $httpBackend.whenGET('/orders.json').respond(function() {
            return [200, JSON.stringify([order]), {}]
        });
    }));

    it('should load orders', function() {
        var allOrders = this.svc.getAll();
        expect(this.svc.orders).toEqual([]);
    });

    it('should add an order', function() {
        this.svc.createOrder({
            name: orderName,
            status: {id: orderStatus},
            created_at: new Date()
        });
        $httpBackend.flush();
        expect(this.svc.orders.length).toEqual(1);
        expect(this.svc.orders[0].name).toEqual(orderName);
        expect(this.svc.orders[0].status.id).toEqual(orderStatus);
    });

    it('should update an order and restore it', function() {
        this.svc.createOrder({
            name: orderName,
            status: {id: orderStatus},
            created_at: new Date()
        });
        $httpBackend.flush();
        this.svc.orders[0].status.id = 'delivered';
        this.svc.updateStatus(this.svc.orders[0]);
        this.svc.orders = [];
        // restore
        this.svc.getAll();
        $httpBackend.flush();
        // finally test
        expect(this.svc.orders.length).toEqual(1);
        expect(this.svc.orders[0].name).toEqual(orderName);
        expect(this.svc.orders[0].status.id).toEqual('delivered');
    });
});
