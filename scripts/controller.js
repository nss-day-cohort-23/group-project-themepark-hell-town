"use strict";
const model = require('./model'); 
const view = require('./view');
let wicked = require('../wickedpicker.js');

$('#time').wickedpicker();

module.exports.activateListeners = ()=>{
   //eventLstnr for search bar
   $('#searchInput').keypress(searchAttractionsByName);


   //eventLstnr for grid click
   $('.gridItem').click(searchAttractionsByArea);


    //eventLstnr for time select
  $('#subTime').click(module.exports.searchAttractionsByTime); 


   //eventLstnr for 'current' btn
    // $('current-attractions-button').click(searchAttractionsByHour);


   //eventLstnr for attraction cards

};

module.exports.searchAttractionsByTime = () => {
  let attractionSchedule = [];
  let timeVal = model.formatTimes($('#time').val());

  model.getParkData('attractions')
    .then(attractions => {
      attractions.forEach((attraction) => {
        let attractionTimes = attraction.times;
        if (attractionTimes) {
          attractionTimes.forEach((time) => {
            let formattedTime = model.formatTimes(time);
            if (+formattedTime - (+timeVal) <= 100 && +formattedTime - (+timeVal) >0){
              attractionSchedule.push(attraction);
            }
          });
        }
      });
      console.log(attractionSchedule);
      view.printAttractionsByTime(attractionSchedule);

    });
};


const searchAttractionsByName = (e)=>{
   if(e.keyCode === 13){
      let searchInput = $('#searchInput').val();
      model.getParkData('attractions')
         .then(attractions=>{
            model.retrieveAreaByAttraction(attractions, searchInput)
         .then(searchResults=>{
            let listOfAreasToHighlight = [];
                  searchResults.forEach(function(attraction){
                  listOfAreasToHighlight.push(attraction.area_id);
               });
            view.highlightAreas(listOfAreasToHighlight);
      });
   });
}
};

const searchAttractionsByArea = (function(e){
      let id = $(this).attr('id').match(/\d+/)[0];
      // console.log('id: ',id);
      model.getParkData('attractions')
      .then(attractions=>{
         model.retrieveAttractionsByArea(attractions,id)
      .then(attractionsArr => {
         view.printAttractionsByArea(attractionsArr);
      }); 
   });
});



