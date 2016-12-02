import angular from 'angular';

// Create the module where our functionality can attach to
let bewerkOpdrachtModule = angular.module('app.bewerk-opdracht', []);

// Include our UI-Router config settings
import BewerkOpdrachtConfig from './bewerk-opdracht.config';
bewerkOpdrachtModule.config(BewerkOpdrachtConfig);


// Controllers
import BewerkOpdrachtCtrl from './bewerk-opdracht.controller';
bewerkOpdrachtModule.controller('BewerkOpdrachtCtrl', BewerkOpdrachtCtrl);


export default bewerkOpdrachtModule;
