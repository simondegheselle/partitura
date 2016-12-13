class BeheerOpdrachtenCtrl {
    constructor(User, Opdrachten, opdracht, $state, $mdDialog, $scope) {
        'ngInject';

        this._Opdrachten = Opdrachten;
        this._$state = $state;
        this._$scope = $scope;
        this._opdracht = opdracht;
        this._$mdDialog = $mdDialog;


        this.titel = $state.current.title;
        this.bewerkType = $state.current.name.replace('app.', '');

        this.selectedStudent = User.selectedStudent;


        $scope.$watch('$ctrl.selectedStudent', (newval) => {
            Opdrachten
                .getAll(this.selectedStudent)
                .then(
                    (opdrachten) => {
                        this.opdrachten = opdrachten.map(function(element) {
                            element.deadline = new Date(element.deadline);
                            return element;
                        });
                    }
                );
        });



    }

    verwijder(ev, opdracht) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this._$mdDialog.confirm()
            .title('Ben je zeker dat je deze opdracht wilt verwijderen')
            .textContent('Klik op OK om te bevestigen')
            .targetEvent(ev)
            .ok('OK')
            .cancel('Terug');

        this._$mdDialog.show(confirm).then(
            (success) => {
                this.verwijderOpdracht(opdracht)
            }
        );
    };

    verwijderOpdracht(opdracht) {
        this.isDeleting = true;
        this._Opdrachten.destroy(opdracht).then(
            (success) => {
                this._$state.go('app.beheer-opdrachten')
                this._$state.reload();
            },
            (err) => this._$state.go('app.beheer-opdrachten')
        );
    }


    showBewerken(ev, type, opdracht) {
        this._$mdDialog.show({
                controller: 'DialogCtrl as $ctrl',
                templateUrl: 'beheer-opdrachten/beheer-opdracht-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this._$scope.customFullscreen,
                locals: {
                    type: type,
                    opdracht: opdracht,
                    selectedStudent: this.selectedStudent
                }
            })
            .then(function(answer) {

                //this._$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //this._$scope.status = 'You cancelled the dialog.';
            });
    };
}



export default BeheerOpdrachtenCtrl;
