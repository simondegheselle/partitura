class BeheerPartiturenCtrl {
    constructor(User, Partituren, $state, $scope, $mdDialog) {
        'ngInject';

        this._Partituren = Partituren;
        this._User = User;
        this._$state = $state;
        this._$scope = $scope;
        this.titel = $state.current.title;

        this.selectedUser = User.selectedUser === null? User.current : User.selectedUser;    

        $scope.$watch('$ctrl.selectedUser', (newval) => {
            if (newval !== null) {
                Partituren
                    .getAll(this.selectedUser)
                    .then(
                        (partituren) => {
                            this.partituren = partituren;
                        }
                    );
            }
        });
    }

    openBib() {
        this.selectedUser = this._User.current;
        this._User.selectUser(this.selectedUser);
    }

    isEditView() {
        return this.selectedUser === this._User.current;
    }
}



export default BeheerPartiturenCtrl;
