class BeheerPartiturenReadViewCtrl {
    constructor(Partituren, User, $state, $mdDialog, $scope) {
        'ngInject';

        this._Partituren = Partituren;
        this._$state = $state;
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
    }
}

let BeheerPartiturenEditView = {
    bindings: {
        partituren: '='
    },
    controller: BeheerPartiturenReadViewCtrl,
    templateUrl: 'components/beheer-helpers/beheer-partituren-readview.html'
};

export default BeheerPartiturenEditView;
