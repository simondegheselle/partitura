class BeheerStudentenDialogCtrl {
    constructor($mdDialog, User, $scope, $state, type, student) {
        'ngInject';
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
        this._User = User;
        this._$state = $state;
        this.type = type;
        if (type == "Bewerk") {
            this.student = student;
        } else {
            this.student = {
                naam: ''
            }
        }
    }

    hide() {
        this._$mdDialog.hide();
    };

    cancel() {
        this._$mdDialog.cancel();
        console.log("cancel");
    };



    submit() {
        this.isSubmitting = true;
        if (this.type == 'Toevoegen') {
            this.student.type = 'student';
            console.log(this.student);
            this._User.registreer(this.student).then(
                (nieuweStudent) => {
                    console.log('Nieuwe student aangemaakt');
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

export default BeheerStudentenDialogCtrl;
