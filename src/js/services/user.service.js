export default class User {
    constructor(JWT, AppConstants, $http, $state, $q) {
        'ngInject';

        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$state = $state;
        this._$q = $q;

        this.current = null;
        this.selectedStudent = null;
    }

    getStudenten() {
        return this._$http({
            url: this._AppConstants.api + '/',
            method: 'GET',
        }).then((res) => {
            console.log(res.data.users);
            return res.data.users.filter(function(element) {
                return element.type === 'student';
            });
        });
    }

    login(credentials) {
        return this._$http({
            url: this._AppConstants.api + '/users/login',
            method: 'POST',
            data: {
                user: credentials
            }
        }).then(
            (res) => {
                this._JWT.save(res.data.user.token);
                this.current = res.data.user;
                return res;
            }
        );
    }

    registreer(credentials) {
        return this._$http({
            url: this._AppConstants.api + '/users',
            method: 'POST',
            data: {
                user: credentials
            }
        }).then(
            (res) => {
                return res;
            }
        );
    }

    update(fields) {
        return this._$http({
            url: this._AppConstants.api + '/user',
            method: 'PUT',
            data: {
                user: fields
            }
        }).then(
            (res) => {
                this.current = res.data.user;
                return res.data.user;
            }
        )
    }

    logout() {
        this.current = null;
        this._JWT.destroy();
        this._$state.go('app.login', null, {
            reload: true
        });
    }

    verifyAuth() {
        let deferred = this._$q.defer();

        // check for JWT token
        if (!this._JWT.get()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        if (this.current) {
            deferred.resolve(true);

        } else {
            this._$http({
                url: this._AppConstants.api + '/user',
                method: 'GET',
                headers: {
                    Authorization: 'Token ' + this._JWT.get()
                }
            }).then(
                (res) => {
                    this.current = res.data.user;
                    deferred.resolve(true);
                },

                (err) => {
                    this._JWT.destroy();
                    deferred.resolve(false);
                }
            )
        }

        return deferred.promise;
    }


    ensureAuthIs(bool) {
        let deferred = this._$q.defer();

        this.verifyAuth().then((authValid) => {
            if (authValid !== bool) {
                this._$state.go('app.home')
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }
        });
        return deferred.promise;
    }

    ensureIsLeraar() {
        let deferred = this._$q.defer();

        // check for JWT token
        this.verifyAuth().then((authValid) => {
            if (authValid) {
                if (this.current.type === 'leraar') {
                    deferred.resolve(true);
                } else {
                    this.logout();
                    deferred.resolve(false);
                }
            } else {
                this.logout();
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    ensureIsStudent() {
        let deferred = this._$q.defer();

        // check for JWT token
        this.verifyAuth().then((authValid) => {
            if (authValid) {
                if (this.current.type === 'student') {
                    deferred.resolve(true);
                } else {
                    this.logout();
                    deferred.resolve(false);
                }
            } else {
                this.logout();
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    destroy(student) {
        console.log(student);
        return this._$http({
            url: this._AppConstants.api + '/users/' + student.id,
            method: 'DELETE'
        });
    }

    selectStudent(student) {
        this.selectedStudent = student;
    }
}
