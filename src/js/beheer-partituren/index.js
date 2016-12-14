import angular from 'angular';

// Create the module where our functionality can attach to
let beheerPartiturenModule = angular.module('app.beheer-partituren', []);

// Include our UI-Router config settings
import BeheerPartiturenConfig from './beheer-partituren.config';
beheerPartiturenModule.config(BeheerPartiturenConfig);

// Controllers
import BeheerPartiturenDialogCtrl from './dialogs/beheer-partituren-dialog.controller';
beheerPartiturenModule.controller('BeheerPartiturenDialogCtrl', BeheerPartiturenDialogCtrl);

import SharePartituurDialogCtrl from './dialogs/share-partituur-dialog.controller';
beheerPartiturenModule.controller('SharePartituurDialogCtrl', SharePartituurDialogCtrl);

import BeheerPartiturenCtrl from './beheer-partituren.controller';
beheerPartiturenModule.controller('BeheerPartiturenCtrl', BeheerPartiturenCtrl);

export default beheerPartiturenModule;
