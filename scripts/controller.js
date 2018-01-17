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
    let id = this.id;
    searchAttractionsById(id);

    // click on an attraction besides currently selected one, it removes unhighlight from all
    if ($(this).find('.attrDescription').is(':hidden'))
      $('.gridItem').removeClass('unhighlight');  
    
    $(this).find('.attrDescription').slideToggle();
    $('#descriptionArea').find('.attrDescription').not($(this).find('.attrDescription')).hide();
    let item = $(this).attr('class').split(' ')[1];
    view.highlightSelectedArea(item); 
  });

  // Itinerary event Listeners
  $(document).on("click", ".itinerary", addToItinerary);
  $('#showItinerary').on("click",getItinerary);
  $(document).on("click", '.deleteFromItinerary', deleteFromItinerary);

  //listeenr for attraction-type selector
  $('#typeSelect').change(searchAttractionsByType);

  
  // Top Logo Click
  $('#brand').children().first().click(function(){
    let trans = $('.easter').addClass('reveal');
    setTimeout(function () {
      trans.removeClass('reveal');
    }, 4000);
  });

};

const getItinerary = ()=>{
  view.removeLocation();
  model.getParkData('itinerary')
    .then(ids=>{
      $.each(ids, function(entry){
        ids[entry].entry_id = entry;
      });
      let idsArray = Object.keys(ids);
      let valuesArray = [];
      idsArray.forEach(function(value, index){
          valuesArray.push(ids[value]);
        });
      view.printItinerary(valuesArray);
    });
};

const addToItinerary = function(){
  let fulltext = $(this.parentNode.parentNode).html();
  let attractionId = this.parentNode.parentNode.id;
  let presendText = {attr_id: attractionId};
  let sendText = JSON.stringify(presendText);
  model.getParkData('itinerary')
  .then(ids=>{
    $.each(ids, function(entry){
      ids[entry].entry_id = entry;
    });
  });
  $.ajax({
    method: "POST",
    url:"https://theme-park-project.firebaseio.com/theme-park/itinerary.json",
    dataType: "json",
    data: sendText
  }).done(response =>{
    console.log('response: ',response);
    $(this.parentNode.parentNode).find('p').text("Added to Itinerary!");
    setTimeout(function(){$(`#${attractionId}`).html(fulltext).find('.attrDescription').hide();}, 2000);
  });
};

const deleteFromItinerary = function(){
  view.removeLocation();
  let attractionToDeletedID = this.parentNode.parentNode.id;
  let testText = JSON.stringify(this.parentNode.parentNode.id);
  $.ajax({
    method: "DELETE",
    url:`https://theme-park-project.firebaseio.com/theme-park/itinerary/${attractionToDeletedID}.json`,
    data: testText
  }).done(response =>{
    console.log('deleted!!', this.parentNode.parentNode.id);
    $(`#${this.parentNode.parentNode.id}`).html(`<p><b>Removed from Itinerary!</b></p>`);
    setTimeout(getItinerary, 2000);    
  });
};

module.exports.searchAttractionsByTime = () => {
  $(`.gridItem`).removeClass("highlight");
  view.removeUnhighlight();
  view.removeLocation();
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
              } 
            }
          });
        }
      });
      view.printAttractionsFoSho(attractionSchedule, "areas");
      view.highlightAreas(listToHighlight);
    });
  view.clearInputs('time');
};


const searchAttractionsByName = (e)=>{
  $(`.gridItem`).removeClass("highlight");  
  view.removeUnhighlight();
  if(e.keyCode === 13 && ($('#searchInput').val() !== '')){
    view.removeLocation();
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
            view.printAttractionsFoSho(searchResults, "areas");
            
        });
        });
        view.clearInputs('name');
    }
};

const searchAttractionsByArea = function(e){
  $(`.gridItem`).removeClass("highlight");    
  view.removeUnhighlight();
  view.removeLocation();

  $(this).addClass("highlight");
  let id = $(this).attr('id').match(/\d+/)[0];
  model.getParkData('attractions')
    .then(attractions=>{
        model.retrieveAttractionsByProp(attractions,id,'area_id')
    .then(attractionsArray => {
        view.printAttractionsFoSho(attractionsArray, "attraction_types");
    }); 
  });
  view.clearInputs('area');
};


const searchAttractionsByType = function(){
  for(let i = 1; i < 9; i++){
    $(`#item${i}`).removeClass("highlight");
  }
  view.removeUnhighlight();
  view.removeLocation();

  let typeNum = $(this).val();
  if(typeNum !== ""){
    model.getParkData('attractions')
      .then(attractions=>{
        return model.retrieveAttractionsByProp(attractions, typeNum, 'type_id'); 
      })
      .then(attractionsArray => {
        view.printAttractionsFoSho(attractionsArray, "areas");
        let listToHighlight = [];
        attractionsArray.forEach((attraction)=>{
          listToHighlight.push(attraction.area_id);
        });
        view.highlightAreas(listToHighlight);
      });
  }
  view.clearInputs('type');
};


const searchAttractionsById = function(attId){
  model.getParkData('attractions')
    .then(attractions=>{
      attractions.forEach((attraction)=>{
        if (attraction.id === +attId){
          view.removeLocation();
          $(`#item${attraction.area_id}`).children('.gridCells')
            .children(`.location${attraction.location}`)
              .addClass("cell-highlight");
          $(`#item${attraction.area_id}`).children('p').addClass("nameFade");
        }
      });
    });
};



const removeReveal = ()=>{
  $('.easter').removeClass('reveal');
};



