"use strict";
const model = require('./model'); 
const view = require('./view');

module.exports.activateListeners = ()=>{
   //eventLstnr for search bar
   $('#searchInput').keypress(searchAttractionsByName);


   //eventLstnr for grid click
   // change selector below to the grid/map container element
      $('.gridItem').click(searchAttractionsByArea);


   //eventLstnr for time select
      // $('time-selector').change(searchAttractionsByHour);


   //eventLstnr for 'current' btn
      // $('current-attractions-button').click(searchAttractionsByHour);

   //eventLstnr for attraction cards

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
            view.printAttractionsByHour(attractionsArr);
          });

      });
};


