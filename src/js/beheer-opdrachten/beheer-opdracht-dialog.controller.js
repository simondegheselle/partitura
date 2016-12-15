class DialogCtrl {
    constructor(User, $mdDialog, $scope, Opdrachten, $state, type, opdracht) {
        'ngInject';
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
        this._Opdrachten = Opdrachten;
        this._$state = $state;
        this.type = type;
        this._User = User;
        if (type == "Bewerk") {
            this.opdracht = opdracht;
        } else {
            this.opdracht = {
                naam: ''
            }
        }
    }

    hide() {
        this._$mdDialog.hide();
    };

    cancel() {
        this._$mdDialog.cancel();
    };



    submit() {
        this.isSubmitting = true;
        if (this.type == 'Toevoegen') {
            this._Opdrachten.create(this.opdracht).then(
                (nieuweOpdracht) => {
                    this.hide();
                    this._$state.reload();
                },
                (err) => {
                    this.isSubmitting = false;
                    this.errors = err.data.errors;
                }

            )
        }

        if (this.type == "Bewerk") {
            this._Opdrachten.update(this.opdracht).then(
                (nieuweOpdracht) => {
                    this.hide();
                    this._$state.reload();
                },

                (err) => {
                    this.isSubmitting = false;
                    this.errors = err.data.errors;
                }

            )
        }
    };
}

export default DialogCtrl;
