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
   $('#currentEventsBtn').click(function(){
     $('#time').val(new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric"}));
     module.exports.searchAttractionsByTime();
   });
  
   //click on attraction, get description
   $(document).on('click', ".attraction", function() {
    $(this).find('.attrDescription').slideToggle();
  });

   //listnr for type select
   $('#typeSelect').change(searchAttractionsByType);

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

const searchAttractionsByArea = function(e){
      let id = $(this).attr('id').match(/\d+/)[0];
      model.getParkData('attractions')
      .then(attractions=>{
         model.retrieveAttractionsByProp(attractions,id,'area_id')
      .then(attractionsArr => {
         view.printAttractionsByArea(attractionsArr);
      }); 
   });
};


const searchAttractionsByType = function(){
  let typeNum = $(this).val();
  model.getParkData('attractions')
    .then(attractions=>{
      return model.retrieveAttractionsByProp(attractions, typeNum, 'type_id'); 
    })
    .then(attractionsArr => {
      view.printAttractionsByTime(attractionsArr);
    });
};



