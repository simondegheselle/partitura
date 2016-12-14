import angular from 'angular';

// Create the module where our functionality can attach to
let partiturenModule = angular.module('app.partituren', []);

// Include our UI-Router config settings
import PartiturenConfig from './partituren.config';
partiturenModule.config(PartiturenConfig);


import PartiturenCtrl from './partituren.controller';
partiturenModule.controller('PartiturenCtrl', PartiturenCtrl);

export default partiturenModule;
