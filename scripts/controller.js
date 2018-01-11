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
    $('#subTime').click(searchAttractionsByTime);


   //eventLstnr for 'current' btn
      // $('current-attractions-button').click(searchAttractionsByHour);

   //eventLstnr for attraction cards

};

const searchAttractionsByTime = () => {
  let timeArr = [];
  let timeVal = model.formatTimes($('#time').val());

  model.getParkData('attractions')

    .then(attractions => {
      attractions.forEach((at) => {
        let AtTimes = at.times;
        if (AtTimes) {
          AtTimes.forEach((time) => {
            let formTime = model.formatTimes(time);
            console.log(at);
             timeArr.push(formTime);
          });
        }

      //   timeArr.forEach((time) =>{
      //     if (+time - (+timeVal) <= 100){
      //       console.log(time);
      //       console.log(at);
      //     }
      // });

    

      });
      // console.log(timeVal);
      // console.log(timeArr, 's this twice?');

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



