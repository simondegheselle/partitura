import angular from 'angular';

// Create the module where our functionality can attach to
let beheerOpdrachtenModule = angular.module('app.beheer-opdrachten', []);

// Include our UI-Router config settings
import BeheerOpdrachtenConfig from './beheer-opdrachten.config';
beheerOpdrachtenModule.config(BeheerOpdrachtenConfig);


// Controllers

import DialogCtrl from './beheer-opdracht-dialog.controller';
beheerOpdrachtenModule.controller('DialogCtrl', DialogCtrl);

import BeheerOpdrachtenCtrl from './beheer-opdrachten.controller';
beheerOpdrachtenModule.controller('BeheerOpdrachtenCtrl', BeheerOpdrachtenCtrl);


export default beheerOpdrachtenModule;
