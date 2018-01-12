"use strict";

const model = require('./model'); 
const view = require('./view');
const controller = require('./controller');

//populate page w/ html 
view.populatePage();
// model.getParkData('areas'); //test
// model.getParkData('attractions'); //test
// controller.searchAttractionsByArea();  //test



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


// PRINT THE CURRENT ATTRACTIONS FOR THE CURRENT MACHINE TIME:
// model.getParkData('attractions') 
//    .then(attractions=>{
//       view.printAttractionsByHour(attractions);
//    })

