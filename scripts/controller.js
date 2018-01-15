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

    // click on an attraction besides currently selected one, it removes unhighlight from all
    if ($(this).find('.attrDescription').is(':hidden'))
      $('.gridItem').removeClass('unhighlight');  
    
    $(this).find('.attrDescription').slideToggle();
    $('#descriptionArea').find('.attrDescription').not($(this).find('.attrDescription')).hide();
    let item = $(this).attr('class').split(' ')[1];
    view.highlightSelectedArea(item); 
  });

   //listnr for type select
   $('#typeSelect').change(searchAttractionsByType);

};



module.exports.searchAttractionsByTime = () => {
  for(let i = 1; i < 9; i++){
    $(`#item${i}`).removeClass("highlight");
  } 
   view.removeUnhighlight();

  let attractionSchedule = [];
  let timeVal = model.formatTimes($('#time').val());
  let listToHighlight = [];
  model.getParkData('attractions')
    .then(attractions => {
      attractions.forEach((attraction) => {
        let attractionTimes = attraction.times;
        if (attractionTimes) {
          attractionTimes.forEach((time) => {
            let formattedTime = model.formatTimes(time);
            if (+formattedTime - (+timeVal) <= 100 && +formattedTime - (+timeVal) >= 0){
              listToHighlight.push(attraction.area_id);
              attractionSchedule.push(attraction);
            }
          });
        }
      });
      view.printAttractionsByTime(attractionSchedule);
      view.highlightAreas(listToHighlight);
    });
    view.clearInputs('time');
};


const searchAttractionsByName = (e)=>{
  for(let i = 1; i < 9; i++){
    $(`#item${i}`).removeClass("highlight");
  }
  view.removeUnhighlight();

   if(e.keyCode === 13 && ($('#searchInput').val() !== '')){
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
            view.printAttractionsByArea(searchResults);
        });
        });
        view.clearInputs('name');
    }
};

const searchAttractionsByArea = function(e){
  for(let i = 1; i < 9; i++){
    $(`#item${i}`).removeClass("highlight");
  }
  view.removeUnhighlight();

  $(this).addClass("highlight");
  let id = $(this).attr('id').match(/\d+/)[0];
  model.getParkData('attractions')
    .then(attractions=>{
        model.retrieveAttractionsByProp(attractions,id,'area_id')
    .then(attractionsArr => {
        view.printAttractionsByArea(attractionsArr);
    }); 
  });
  view.clearInputs('area');
};


const searchAttractionsByType = function(){
  for(let i = 1; i < 9; i++){
    $(`#item${i}`).removeClass("highlight");
  }
  view.removeUnhighlight();

  let typeNum = $(this).val();
  if(typeNum !== ""){
    model.getParkData('attractions')
      .then(attractions=>{
        return model.retrieveAttractionsByProp(attractions, typeNum, 'type_id'); 
      })
      .then(attractionsArr => {
        view.printAttractionsByTime(attractionsArr);
        let listToHighlight = [];
        attractionsArr.forEach((attraction)=>{
          listToHighlight.push(attraction.area_id);
        });
        view.highlightAreas(listToHighlight);
      });
  }
  view.clearInputs('type');
};



