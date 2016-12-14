export default class Partituren {
    constructor(JWT, AppConstants, $http, $q) {
        'ngInject';
        this._AppConstants = AppConstants;
        this._$http = $http;
    }

    getAll(user) {
        return this._$http({
            url: this._AppConstants.api + '/partituren',
            method: 'GET'
        }).then((res) => {
            let partituren = [];
            for (var i = 0 ; i < res.data.partituren.length; i++) {
                let value = res.data.partituren[i];
                if (value.eigenaar.id === user.id || value.gedeeldMet.indexOf(user.id) >= 0) {
                    partituren.push(value);
                }
            }
            return partituren;
        });
    }


    get(id) {
        let deferred = this._$q.defer();
        this._$http({
            url: this._AppConstants.api + '/partituren/' + id,
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

    destroy(partituur) {
        return this._$http({
            url: this._AppConstants.api + '/partituren/' + partituur.id,
            method: 'DELETE'
        });
    }

    create(partituur) {
        let request = {};
        request.url = `${this._AppConstants.api}/partituren`;
        request.method = 'POST';
        request.data = {
            partituur: partituur
        };
        return this._$http(request).then((res) => res.data.partituur);
    }


    update(partituur) {
		console.log(partituur);
        return this._$http({
            url: this._AppConstants.api + '/partituren',
            method: 'PUT',
            data: {
                partituur: partituur
            }
        }).then(
            (res) => {
                return res.data.partituur;
            }
        )
    }
}
