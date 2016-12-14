class BeheerPartiturenDialogCtrl {
    constructor(User, $mdDialog, $scope, Partituren, $state, type, partituur, Upload, $window) {
        'ngInject';
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
        this._Partituren = Partituren;
        this._$state = $state;
        this.type = type;
        this._User = User;
        this._Upload = Upload
        this._$window = $window;
        if (type == "Bewerk") {
            this.partituur = partituur;

        } else {
            this.partituur = {
                naam: ''
            }
        }
    }


    upload(file) {
        return this._Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data: {
                file: file
            } //pass file as data, should be user ng-model
        }).then((resp) => { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                return resp;
            } else {
                this._$window.alert('an error occured');
            }
        }, (resp) => { //catch error
            console.log('Error status: ' + resp.status);
            this._$window.alert('Error status: ' + resp.status);
        }, (evt) => {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            this.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };

    hide() {
        this._$mdDialog.hide();
    };

    cancel() {
        this._$mdDialog.cancel();
    };



    submit() {
        this.isSubmitting = true;
        if (this.file) {
            this.upload(this.file).then(res => {
                    this.partituur.filename = this.file.name;
                    if (this.type == 'Toevoegen') {
                        this._Partituren.create(this.partituur).then(
                            (nieuwePartituur) => {
                                this.hide();
                                this._$state.reload();
                            },
                            (err) => {
                                this.isSubmitting = false;
                                this.errors = err.data.errors;
                            }

                        )
                    }

                    if (this.type == "Bewerk") {
                        this._Partituren.update(this.partituur).then(
                            (nieuwePartituur) => {
                                this.hide();
                                this._$state.reload();
                            },
                            (err) => {
                                this.isSubmitting = false;
                                this.errors = err.data.errors;
                            }

                        )
                    }
                },
                (err) => {
                    console.log("error");
                }
            );

        } else {
            this.errors = {
                message: "Je moet een bijlage toevoegen"
            };
            this.isSubmitting = false;
        }


    };




}

export default BeheerPartiturenDialogCtrl;
