"use strict";
const $ = require('jquery');
const model = require('./model'); 
const view = require('./view');

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
      let id = $(this).attr('id').match(/\d+/)[0];
      model.getParkData('areas');
      console.log(id);
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
   // $('searchInput').keyPress(searchAttractionsByName);


   //eventLstnr for grid click
   // change selector below to the grid/map container element
      // $('document').click(searchAttractionsByArea);


   //eventLstnr for time select
      // $('time-selector').change(searchAttractionsByHour);


   //eventLstnr for 'current' btn
      // $('current-attractions-button').click(searchAttractionsByHour);

   //eventLstnr for attraction cards

};

const searchAttractionsByName = (e)=>{
   if(e.keyCode === 13){
      // let searchInput = #.val();
      model.getParkData('attractions')
         .then(attractions=>{
            // return model.retrieveAreaByAttraction(attractions, searchInput);
         })
         .then(searchResults=>{
            // return model.retrieveAttractionsByArea(searchResults);
         })
         .then(attractionsArr=>{
            // view.printAttractions(attractionsArr);
         });
   }
};

const searchAttractionsByArea = (e)=>{
   let id = e.target.id;
   model.getParkData('areas')
      .then(areas=>{
      //   return model.retrieveAttractionsByArea(areas,id);
      }) 
      .then(attractionsArr => {
            // view.printAttractions(attractionsArr);
      });
};

const searchAttractionsByHour = (e)=>{
      let hour;
      if($('time-selector').val() === 'no time selected/null'){
            hour = new Date(); // convert this to an hour-like number
      }else{
            hour = this.value; // might need to be .val() also might need to be not 'this'
      }

      model.getParkData('attractions')
          .then(attractions=>{
            model.retrieveAttractionsByHour(attractions, hour)
          .then(attractionsArr=>{
            view.printAttractions(attractionsArr);
          });

      });
};


