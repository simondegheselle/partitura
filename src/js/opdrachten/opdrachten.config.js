function OpdrachtenConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.opdrachten', {
    url: '/opdrachten',
    controller: 'OpdrachtenCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'opdrachten/opdrachten.html',
    title: 'Opdrachten'
  });
};

export default OpdrachtenConfig;
