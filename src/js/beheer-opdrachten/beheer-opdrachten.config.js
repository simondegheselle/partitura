function BeheerOpdrachtenConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.beheer-opdrachten', {
            url: '/beheer-opdrachten',
            controller: 'BeheerOpdrachtenCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'beheer-opdrachten/beheer-opdrachten.html',
            title: 'Beheer opdrachten',
            resolve: {
                auth: function(User) {
                    return User.ensureAuthIs(true) && User.ensureIsLeraar();
                }
            }
        })
};

export default BeheerOpdrachtenConfig;
