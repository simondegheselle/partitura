function BewerkOpdrachtConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.bewerk-opdracht', {
    url: '/bewerk-opdracht/:id',
    controller: 'BewerkOpdrachtCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'bewerk-opdracht/bewerk-opdracht.html',
    title: 'Bewerk opdracht',
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
  .state('app.toevoegen-opdracht', {
    url: '/toevoegen-opdracht/:id',
    controller: 'BewerkOpdrachtCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'bewerk-opdracht/bewerk-opdracht.html',
    title: 'Toevoegen opdracht',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      opdracht: function(Opdrachten, User, $state, $stateParams) {
        if ($stateParams.id) {
          return Opdrachten.get($stateParams.id).then(
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
  });

};

export default BewerkOpdrachtConfig;
