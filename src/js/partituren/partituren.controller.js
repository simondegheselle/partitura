class PartiturenCtrl {
    constructor(User, Partituren, $state, $scope, $mdDialog) {
        'ngInject';

        this._Partituren = Partituren;
        this._User = User;
        this._$state = $state;
        this._$scope = $scope;
        this.titel = $state.current.title;

        Partituren
            .getAll(User.current)
            .then(
                (partituren) => {
                    this.partituren = partituren;
                }
            );
    }
}



export default PartiturenCtrl;
