function BeheerPartiturenConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.beheer-partituren', {
            url: '/beheer-partituren',
            controller: 'BeheerPartiturenCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'beheer-partituren/beheer-partituren.html',
            title: 'Beheer partituren',
            resolve: {
                auth: function(User) {
                    return User.ensureAuthIs(true) && User.ensureIsLeraar();
                }
            }
        })
};

export default BeheerPartiturenConfig;
