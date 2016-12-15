class OpdrachtenCtrl {
    constructor(User, Opdrachten, AppConstants, $scope) {
        'ngInject';
        console.log(User.current);
        this.opdrachtenType = 'to-do';
        this._Opdrachten = Opdrachten;
        this._User = User;
        this.opdrachtType = 'to-do';
        this.setList(this.opdrachtType);
    }

    setList(type) {
        this.opdrachtType = type;
        if (type === 'to-do') {
            this._Opdrachten
                .getAll(this._User.current)
                .then(
                    (opdrachten) => {
                        console.log(opdrachten);
                        this.opdrachten = opdrachten.filter(function(val) {
                            return val.afgewerkt === false || !val.hasOwnProperty("afgewerkt");
                        });
                    }
                );
        }
        if (type === 'done') {
            this._Opdrachten
                .getAll(this._User.current)
                .then(
                    (opdrachten) => {
                        this.opdrachten = opdrachten.filter(function(val) {
                            return val.afgewerkt === true;
                        });
                    }
                );
        }
    }
}

export default OpdrachtenCtrl;
