export default class Opdrachten {
    constructor(JWT, AppConstants, $http, $q) {
        'ngInject';
        this._AppConstants = AppConstants;
        this._$http = $http;
    }

    getAll(user) {
        return this._$http({
            url: this._AppConstants.api + '/opdrachten',
            method: 'GET'
        }).then((res) => {
            let opdrachten = [];
            for (var i = 0 ; i < res.data.opdrachten.length; i++) {
                let value = res.data.opdrachten[i];
                if (value.user === user.id) {
                    opdrachten.push(value);
                }
            }
            return opdrachten;
        });
    }


    get(id) {
        let deferred = this._$q.defer();
        this._$http({
            url: this._AppConstants.api + '/opdrachten/' + id,
            method: 'GET',
            data: {
                id: id
            }
        }).then(
            (res) => deferred.resolve(res.data.opdracht),
            (err) => deferred.reject(err)
        );

        return deferred.promise;
    }

    destroy(opdracht) {
        return this._$http({
            url: this._AppConstants.api + '/opdrachten/' + opdracht.id,
            method: 'DELETE'
        })
    }

    create(opdracht) {
        let request = {};
        request.url = `${this._AppConstants.api}/opdrachten`;
        request.method = 'POST';
        request.data = {
            opdracht: opdracht
        };
        return this._$http(request).then((res) => res.data.opdracht);
    }


    update(opdracht) {
        return this._$http({
            url: this._AppConstants.api + '/opdrachten/opdracht',
            method: 'PUT',
            data: {
                opdracht: opdracht
            }
        }).then(
            (res) => {
                return res.data.opdracht;
            }
        )
    }
}
