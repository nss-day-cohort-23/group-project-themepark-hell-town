"use strict";
const $ = require('jquery');
const model = require('./model'); 

module.exports.activateListeners = ()=>{
   //eventLstnr for search bar
   // $('searchInput').keyPress(function(e){
   //    if (e.keyCode === 13) {
         // let searchInput = #.val();
   //       model.getParkData('attractions');
         // .then(attractions=>{
            // return model.findAreaByAttraction(attractions, searchInput);
         // })
         // .then(searchResults=>{
            // return model.findAttractionsByArea(searchResults);
         // })
         // .then(attractionsArr=>{
            // view.printAttractions(attractionsArr);
         // });
   //    }
   // });
   
   //eventLstnr for grid click
   $('.gridItem').click(function(){
      let id = $(this).attr('id');
      model.getParkData('areas');
//       .then(areas=>{
//         return model.findAttractionsByArea(areas,id);
//       }) 
//       .then(attractionsArr => {
//             // view.printAttractions(attractionsArr);
//       });
   });

   //eventLstnr for time select
      // $('time-selector').change(funcion(){
      //    let hour = this.val();
            // model.getParkData('attractions');
      //    model.findAttractionsByHour(hour);
      // })


   //eventLstnr for 'current' btn


   //eventLstnr for attraction cards

};







