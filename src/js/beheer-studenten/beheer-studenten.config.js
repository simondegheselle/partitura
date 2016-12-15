function BeheerStudentenConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.beheer-studenten', {
            url: '/beheer-studenten',
            controller: 'BeheerStudentenCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'beheer-studenten/beheer-studenten.html',
            title: 'Beheer studenten',
            resolve: {
                auth: function(User) {
                    return User.ensureAuthIs(true) && User.ensureIsLeraar();
                }            
            }
        })
};

export default BeheerStudentenConfig;
