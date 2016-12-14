import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import ListStudent from './beheer-helpers/student-selectlist.component';
componentsModule.component('listStudent', ListStudent);

import PartituurActions from './beheer-helpers/partituur-actions.component';
componentsModule.component('partituurActions', PartituurActions);

import BeheerPartiturenEditView from './beheer-helpers/beheer-partituren-editview.component';
componentsModule.component('beheerPartiturenEditView', BeheerPartiturenEditView);



import BeheerPartiturenReadView from './beheer-helpers/beheer-partituren-readview.component';
componentsModule.component('beheerPartiturenReadView', BeheerPartiturenReadView);


export default componentsModule;
