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


        console.log(this.studenten);
		console.log('selected student: ' + this.selectedStudent);
    }

    selectStudent(student) {
		console.log('selecting student: ' + student);
        this.selectedStudent = student;
        this._User.selectStudent(student);
    }
}

let StudentSelectList = {
	bindings: {
      selectedStudent: '='
    },
    controller: StudentSelectListCtrl,
    templateUrl: 'components/beheer-helpers/student-selectlist.html'
};

export default StudentSelectList;
