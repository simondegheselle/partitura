import angular from 'angular';

// Create the module where our functionality can attach to
let opdrachtenModule = angular.module('app.opdrachten', []);

// Include our UI-Router config settings
import OpdrachtenConfig from './opdrachten.config';
opdrachtenModule.config(OpdrachtenConfig);


// Controllers
import OpdrachtenCtrl from './opdrachten.controller';
opdrachtenModule.controller('OpdrachtenCtrl', OpdrachtenCtrl);


export default opdrachtenModule;
