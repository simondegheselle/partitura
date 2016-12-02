class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
  }

  submitForm() {
    this.isSubmitting = true;
    this._User.attemptAuth('login', this.formData).then(
      (res) => {
        this._$state.go('app.opdrachten');
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;
