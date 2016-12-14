function PartiturenConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.partituren', {
            url: '/partituren',
            controller: 'PartiturenCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'partituren/partituren.html',
            title: 'Partituren',
            resolve: {
                auth: function(User) {
                    return User.ensureAuthIs(true) && User.ensureIsStudent();
                }
            }
        })
};

export default PartiturenConfig;
