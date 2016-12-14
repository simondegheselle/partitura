class BeheerPartiturenEditViewCtrl {
    constructor(Partituren, User, $state, $mdDialog, $scope) {
        'ngInject';

        this._Partituren = Partituren;
        this._$state = $state;
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
    }

    showToevoegen(ev) {
        this._$mdDialog.show({
                controller: 'BeheerPartiturenDialogCtrl as $ctrl',
                templateUrl: 'beheer-partituren/dialogs/beheer-partituren-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this._$scope.customFullscreen,
                locals: {
                    type: 'Toevoegen',
                    partituur: {
                        naam: ''
                    }
                }
            })
            .then(function(answer) {

                //this._$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //this._$scope.status = 'You cancelled the dialog.';
            });
    };

}

let BeheerPartiturenEditView = {
    bindings: {
        partituren: '='
    },
    controller: BeheerPartiturenEditViewCtrl,
    templateUrl: 'components/beheer-helpers/beheer-partituren-editview.html'
};

export default BeheerPartiturenEditView;
