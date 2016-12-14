class PartituurActionsCtrl {
    constructor(Partituren, User, $state, $mdDialog, $scope) {
        'ngInject';

        this._Partituren = Partituren;
        this._$state = $state;
		this._$scope = $scope;
		this._$mdDialog = $mdDialog;
    }

    verwijderPartituur(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this._$mdDialog.confirm()
            .title('Ben je zeker dat je deze partituur wilt verwijderen')
            .textContent('Klik op OK om te bevestigen')
            .targetEvent(ev)
            .ok('OK')
            .cancel('Terug');

        this._$mdDialog.show(confirm).then(
            (success) => {
                this.isDeleting = true;
                this._Partituren.destroy(this.partituur).then(
                    (success) => {
                        this._$state.reload();
                    },
                    (err) => {
                        this._$state.reload()
                    }
                );
            }
        );
    };

	showBewerken(ev, type) {
        this._$mdDialog.show({
                controller: 'BeheerPartiturenDialogCtrl as $ctrl',
                templateUrl: 'beheer-partituren/dialogs/beheer-partituren-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this._$scope.customFullscreen,
                locals: {
                    type: 'Bewerk',
                    partituur: this.partituur
                }
            })
            .then(function(answer) {

                //this._$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //this._$scope.status = 'You cancelled the dialog.';
            });
    };

	showShare(ev) {
		this._$mdDialog.show({
                controller: 'SharePartituurDialogCtrl as $ctrl',
                templateUrl: 'beheer-partituren/dialogs/share-partituur-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this._$scope.customFullscreen,
                locals: {
                    partituur: this.partituur
                }
            })
            .then(function(answer) {

                //this._$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //this._$scope.status = 'You cancelled the dialog.';
            });
	}

}

let PartituurActions = {
    bindings: {
        partituur: '='
    },
    controller: PartituurActionsCtrl,
    templateUrl: 'components/beheer-helpers/partituur-actions.html'
};

export default PartituurActions;
