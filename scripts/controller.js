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

  $(document).on("click", ".itinerary", addToItinerary);
  $('#showItinerary').on("click",getItinerary);
  $(document).on("click", '#deleteFromItinerary', deleteFromItinerary);

   //listnr for type select
   $('#typeSelect').change(searchAttractionsByType);

};

const getItinerary = ()=>{
  model.getParkData('itinerary')
    .then(ids=>{
      let idsArray = Object.keys(ids);
      let valuesArray = [];
      idsArray.forEach(function(value, index){
          valuesArray.push(ids[value]);

        });
      view.printItinerary(valuesArray);
    });
};

const addToItinerary = function(){
  //  console.log('this:', this.parentNode.parentNode.id);
   let testText = JSON.stringify(this.parentNode.parentNode.id);
  $.ajax({
    method: "POST",
    url:"https://theme-park-project.firebaseio.com/theme-park/itinerary.json",
    data: testText
  }).done(response =>{
    console.log('attraction number: ', this.parentNode.parentNode.id);
  });
};

const deleteFromItinerary = function(){
   console.log('this:', this.parentNode.parentNode.id);

  let testText = JSON.stringify(this.parentNode.parentNode.id);
  // $.ajax({
  //   method: "DELETE",
  //   url:`https://theme-park-project.firebaseio.com/theme-park/itinerary/${}.json`,
  //   data: testText
  // }).done(response =>{
  //   console.log('attraction number: ', this.parentNode.parentNode.id);
  // });
};

module.exports.searchAttractionsByTime = () => {
  $(".gridItem").removeClass('highlight');

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
              if(!attractionSchedule.includes(attraction)){
                listToHighlight.push(attraction.area_id);
                attractionSchedule.push(attraction);
              } else{
                console.log('tesrter',attraction);
              }
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
  $(".gridItem").removeClass('highlight');

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
  if($('.highlight').length  === 1){
    $(this).toggleClass('highlight');
    $(".gridItem").not(this).removeClass('highlight');
  }else{
    $(".gridItem").removeClass('highlight');
    $(this).addClass('highlight');
  } 
  view.removeUnhighlight();  
  
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
  $(".gridItem").removeClass('highlight');

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



