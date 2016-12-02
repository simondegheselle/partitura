class BewerkOpdrachtCtrl {
    constructor(Opdrachten, opdracht, $state) {
        'ngInject';

        this._Opdrachten = Opdrachten;
        this._$state = $state;

        this.titel = $state.current.title;
        this.bewerkType = $state.current.name.replace('app.', '');
    }

    submit() {
        this.isSubmitting = true;
        if (this.bewerkType == "toevoegen-opdracht") {
            this._Opdrachten.create(this.opdracht).then(
                (nieuweOpdracht) => {
                    console.log(nieuweOpdracht);
                    this._$state.go('app.opdrachten');
                },

                (err) => {
                    this.isSubmitting = false;
                    this.errors = err.data.errors;
                }

            )
        }
        if (this.bewerkType == "bewerk-opdracht") {
            this._Opdrachten.update(this.opdracht).then(
                (bewerkteOpdracht) => {
                    this._$state.go('app.opdrachten');
                },
                (err) => {
                    this.isSubmitting = false;
                    this.errors = err.data.errors;
                }

            )
        }
    }
}


export default BewerkOpdrachtCtrl;
