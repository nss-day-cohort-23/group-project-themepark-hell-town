"use strict";

const model = require('./model'); 
const view = require('./view');
let wicked = require('../wickedpicker.js');

$('#time').wickedpicker();

module.exports.activateListeners = ()=>{
   //eventLstnr for search bar
   $('#searchInput').keypress(searchAttractionsByName);


   //eventLstnr for grid click
   // change selector below to the grid/map container element
      $('.gridItem').click(searchAttractionsByArea);


      $('#subTime').click(searchAttractionsByTime);
   //eventLstnr for time select
      // $('time-selector').change(searchAttractionsByHour);


   //eventLstnr for 'current' btn
      // $('current-attractions-button').click(searchAttractionsByHour);

   //eventLstnr for attraction cards

};
const searchAttractionsByTime = () => {
  let attractionSchedule = [];
  let timeVal = model.formatTimes($('#time').val());

  model.getParkData('attractions')

    .then(attractions => {
      attractions.forEach((at) => {
        let AtTimes = at.times;
        if (AtTimes) {
          AtTimes.forEach((time) => {
            let formTime = model.formatTimes(time);
            if (+formTime - (+timeVal) <= 100 && +formTime - (+timeVal) >0){
              attractionSchedule.push(at);
            }
          });
        }
      });
      console.log(attractionSchedule);
      // view.printAttractionsByTime(attractionSchedule);

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

const searchAttractionsByHour = (e)=>{

 console.log( 'is this getting hit?');
      let hour;
      if($('#time').val() === 'no time selected/null'){
            hour = new Date(); // convert this to an hour-like number
      }else{
            hour = this.value; // might need to be .val() also might need to be not 'this'
      }

      model.getParkData('attractions')
          .then(attractions=>{
             model.retrieveAttractionsByHour(attractions, hour)
          .then(attractionsArr=>{
            view.printAttractionsByHour(attractionsArr);
          });

      });
};


