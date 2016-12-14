import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import OpdrachtenService from './opdrachten.service';
servicesModule.service('Opdrachten', OpdrachtenService);

import PartiturenService from './partituren.service';
servicesModule.service('Partituren', PartiturenService);

export default servicesModule;
