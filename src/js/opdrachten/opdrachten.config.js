function OpdrachtenConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.opdrachten', {
            url: '/opdrachten',
            controller: 'OpdrachtenCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'opdrachten/opdrachten.html',
            title: 'Opdrachten',
            resolve: {
                auth: function(User) {
                    return User.ensureAuthIs(true) && User.ensureIsStudent();
                }
            }
        });
};

export default OpdrachtenConfig;
