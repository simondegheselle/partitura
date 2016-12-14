class SettingsCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.formData = {
      email: User.current.email,
      username: User.current.username
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this._User.update(this.formData).then(
      (user) => {
        this._$state.reload();
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }

}

export default SettingsCtrl;
