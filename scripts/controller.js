"use strict";

const model = require('./model'); 
const view = require('./view');
let wicked = require('../wickedpicker.js');

$('#time').wickedpicker();

module.exports.activateListeners = ()=>{
   //eventLstnr for search bar
   // $('searchInput').keyPress(searchAttractionsByName);


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

const searchAttractionsByArea = (function(e){
      let id = $(this).attr('id').match(/\d+/)[0];
      // console.log('id: ',id);
      model.getParkData('attractions')
      .then(attractions=>{
         model.retrieveAttractionsByArea(attractions,id)
      .then(attractionsArr => {
              console.log('attractionsArr: ',attractionsArr);
              // view.printAttractions(attractionsArr);
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
            view.printAttractions(attractionsArr);
          });

      });
};


