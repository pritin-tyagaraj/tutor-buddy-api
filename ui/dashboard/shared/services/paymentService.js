var apiConnector = angular.module('apiConnector');
apiConnector.factory('tbPaymentService', function($http, $q) {
    return {
        /**
         * Records a payment by a student in a batch. This action is triggered by the tutor.
         */
        recordPayment: function(batchId, studentId, amount, time, tutorComment) {
            var deferred = $q.defer();
            var that = this;
            $http.post('/api/v1/batch/' + batchId + '/student/' + studentId + '/payments', {
                amount: amount,
                currency: 'INR',
                time: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                tutor_comment: tutorComment
            }).then(function(response) {
                deferred.resolve();
            }, function(data, status, headers, config) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }
    };
});