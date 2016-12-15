class StudentSelectListCtrl {
    constructor(User, $scope) {
        'ngInject';

        this._User = User;
        User
            .getStudenten()
            .then(
                (studenten) => {
                    this.studenten = studenten;
                }
            );
		console.log('selected student: ' + this.selectedUser);
    }

    selectStudent(student) {
		console.log('selecting student: ' + student);
        this.selectedUser = student;
        this._User.selectUser(student);
    }
}

let StudentSelectList = {
	bindings: {
      selectedUser: '='
    },
    controller: StudentSelectListCtrl,
    templateUrl: 'components/beheer-helpers/student-selectlist.html'
};

export default StudentSelectList;
