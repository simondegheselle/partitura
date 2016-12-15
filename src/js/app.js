import angular from 'angular';

// Import our app config files
import constants from './config/app.constants';
import appConfig from './config/app.config';
import appRun from './config/app.run';
import 'angular-ui-router';
// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import './layout';
import './components';
import './home';
import './services';
import './auth';
import './settings';
import './opdrachten';
import './beheer-opdrachten';
import './beheer-studenten';
import './beheer-partituren';
import './partituren';


// Create and bootstrap application
const requires = [
    'ngFileUpload',
    'ngMaterial',
    'ui.router',
    'templates',
    'app.layout',
    'app.components',
    'app.home',
    'app.services',
    'app.auth',
    'app.settings',
    'app.opdrachten',
    'app.beheer-opdrachten',
    'app.beheer-studenten',
    'app.beheer-partituren',
    'app.partituren'
];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
    strictDi: true
});
