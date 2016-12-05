function BeheerOpdrachtenConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.beheer-opdrachten', {
    url: '/beheer-opdrachten',
    controller: 'BeheerOpdrachtenCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'beheer-opdrachten/beheer-opdrachten.html',
    title: 'Beheer opdrachten',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      opdracht: function(Opdrachten, User, $state, $stateParams) {
        if ($stateParams.id) {
          return Oprachten.get($stateParams.id).then(
            (opdracht) => {
                return opdracht;
            },
            (err) => $state.go('app.opdrachten')
          )
        } else {
          return null;
        }

      }

    }
  })
};

export default BeheerOpdrachtenConfig;
