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
          if (res.data.user.type === 'leraar') {
              this._$state.go('app.beheer-opdrachten');
          } else {
              this._$state.go('app.opdrachten');
          }
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;
