app.config(function ($provide) {
    $provide.decorator('$q', ['$delegate', '$rootScope', function ($delegate, $rootScope) {
        var pendingPromisses = 0;
        $rootScope.$watch(
          function () { return pendingPromisses > 0; },
          function (loading) { $rootScope.loading = loading; }
        );
        var $q = $delegate;
        var origDefer = $q.defer;
        $q.defer = function () {
            var defer = origDefer();
            pendingPromisses++;
            defer.promise.finally(function () {
                pendingPromisses--;
            });
            return defer;
        };
        return $q;
    }]);
});