class BeheerStudentenCtrl {
    constructor(User, $state, $mdDialog, $scope) {
        'ngInject';

        this._User = User;
        this._$state = $state;
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
        this.titel = $state.current.title;

        User
            .getStudenten()
            .then(
                (studenten) => {
                    this.studenten = studenten;
                }
            );


    }

    verwijder(ev, student) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this._$mdDialog.confirm()
            .title('Ben je zeker dat je deze student wilt verwijderen')
            .textContent('Klik op OK om te bevestigen')
            .targetEvent(ev)
            .ok('OK')
            .cancel('Terug');

        this._$mdDialog.show(confirm).then(
            (success) => {
                this.verwijderStudent(student)
            }
        );
    };

    verwijderStudent(student) {
        this.isDeleting = true;
        this._User.destroy(student).then(
            (success) => {
                this._$state.go('app.beheer-studenten')
                this._$state.reload();
            },
            (err) => this._$state.go('app.beheer-studenten')
        );
    }


    showBewerken(ev, type, student) {
        console.log('joe');
        this._$mdDialog.show({
                controller: 'BeheerStudentenDialogCtrl as $ctrl',
                templateUrl: 'beheer-studenten/beheer-studenten-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this._$scope.customFullscreen,
                locals: {
                    type: type,
                    student: student
                }
            })
            .then(function(answer) {

                //this._$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //this._$scope.status = 'You cancelled the dialog.';
            });
    }
}



export default BeheerStudentenCtrl;
