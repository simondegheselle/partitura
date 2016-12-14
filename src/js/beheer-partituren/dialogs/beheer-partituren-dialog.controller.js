class BeheerPartiturenDialogCtrl {
    constructor(User, $mdDialog, $scope, Partituren, $state, type, partituur) {
        'ngInject';
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
        this._Partituren = Partituren;
        this._$state = $state;
        this.type = type;
        this._User = User;
        if (type == "Bewerk") {
            this.partituur = partituur;
        } else {
            this.partituur = {
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
            this._Partituren.create(this.partituur).then(
                (nieuwePartituur) => {
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
            this._Partituren.update(this.partituur).then(
                (nieuwePartituur) => {
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

    showToevoegen(ev, partituur) {
        this._$mdDialog.show({
                controller: 'BeheerPartiturenDialogCtrl as $ctrl',
                templateUrl: 'beheer-partituren/beheer-partituren-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this._$scope.customFullscreen,
                locals: {
                    type: 'Toevoegen',
                    partituur: partituur
                }
            })
            .then(function(answer) {

                //this._$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //this._$scope.status = 'You cancelled the dialog.';
            });
    };

}

export default BeheerPartiturenDialogCtrl;
