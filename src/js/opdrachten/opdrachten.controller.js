class OpdrachtenCtrl {
  constructor(User, Opdrachten, AppConstants, $scope) {
    'ngInject';
    Opdrachten
      .getAll()
      .then(
        (opdrachten) => {
          this.opdrachtenLoaded = true;
          this.opdrachten = opdrachten;
          console.log(opdrachten);
        }
      );


  }
}

export default OpdrachtenCtrl;
