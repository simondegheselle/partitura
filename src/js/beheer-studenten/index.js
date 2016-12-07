import angular from 'angular';

// Create the module where our functionality can attach to
let beheerStudentenModule = angular.module('app.beheer-studenten', []);

// Include our UI-Router config settings
import BeheerStudentenConfig from './beheer-studenten.config';
beheerStudentenModule.config(BeheerStudentenConfig);


// Controllers

import BeheerStudentenDialogCtrl from './beheer-studenten-dialog.controller';
beheerStudentenModule.controller('BeheerStudentenDialogCtrl', BeheerStudentenDialogCtrl);

import BeheerStudentenCtrl from './beheer-studenten.controller';
beheerStudentenModule.controller('BeheerStudentenCtrl', BeheerStudentenCtrl);


export default beheerStudentenModule;
