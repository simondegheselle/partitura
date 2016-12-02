function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider

  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Login',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })
};

export default AuthConfig;
