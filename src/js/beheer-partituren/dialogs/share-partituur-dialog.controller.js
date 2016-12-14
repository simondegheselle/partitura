class SharePartituurDialogCtrl {
    constructor(User, $mdDialog, $scope, Partituren, $state, partituur) {
        'ngInject';
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
        this._Partituren = Partituren;
        this._$state = $state;
        this._User = User;
        this.partituur = partituur;
        console.log(partituur);
        User
            .getStudenten()
            .then(
                (studenten) => {
                    this.studenten = studenten.map(value => {
                        if (this.partituur.gedeeldMet.indexOf(value.id) === -1) {
                            value.gedeeld = false;
                        } else {
                            value.gedeeld = true;
                        }
                        return value;
                    });
                }
            );
    }


    hide() {
        this._$mdDialog.hide();
    };

    cancel() {
        this._$mdDialog.cancel();
    };



    submit() {
        this.isSubmitting = true;
        let sharedStudenten = this.studenten.filter(value => {
            if (value.gedeeld) {
                return value
            }
        });

        this.partituur.gedeeldMet = sharedStudenten;
        this._Partituren.updateSharing(this.partituur).then(
            (nieuwePartituur) => {
                this.hide();
                this._$state.reload();
            },
            (err) => {
                this.isSubmitting = false;
                this.errors = err.data.errors;
            }
        )
    };

}

export default SharePartituurDialogCtrl;
