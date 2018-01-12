"use strict";

const model = require('./model'); 
const view = require('./view');
const controller = require('./controller');

//populate page w/ html 
view.populatePage();

model.getParkData('areas') 
   .then(areas=>{
      view.printAreas(areas);
   })
   .then(()=>{ 
      controller.activateListeners();
   })
   .then(()=>{
      controller.searchAttractionsByTime();
   });    



 