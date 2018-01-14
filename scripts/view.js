"use strict";
const model = require('./model'); 


// fill page w html content
module.exports.populatePage=()=>{
   let d = new Date();
   $('.nav').append(`
      <ul class='navItems'>
         <li id='brand'>Hell Town</li>
         <li>
            <input id='searchInput' type="text" placeholder=" Search">
            <img class="searchIcon" src="images/magnifier.svg">
         </li>
      </ul>
   `);

   $('footer').append(`
      <div class='footer'><p>Copyright ${d.getFullYear()}</p></div>
   `);
};


//populate css grid w/ color coded areas
module.exports.printAreas = (areas)=>{
   areas.forEach(area => {
      $('#areaGrid').append(
         `<div class='gridItem' id='item${area.id}' 
         style='background-color:#${area.colorTheme};'>
         ${area.name}</div>`
      );
   });
};


//populate side bar w/ attractions by area
module.exports.printAttractionsByArea = (attractionsArray)=>{
   $('#descriptionArea').html('');
   model.getParkData('attraction_types')
      .then(types=>{
         types.forEach(function(type){
            attractionsArray.forEach(function(attraction){
              let attractionTimes = '';
               if(attraction.type_id === type.id){
                if(attraction.times){ attractionTimes = attraction.times.join(', ');}
                let area_id = attraction.area_id;
                     $('#descriptionArea').append(`
                     <div class='attraction item${area_id}' id='${attraction.id}'>
                       <p><b>${attraction.name}</b> - <span>${type.name}</span></p>
                        <p class='attrDescription' style='display:none'>
                       ${attraction.description}` + (attraction.times? `<br><br> <b>Start Times: ` + attractionTimes+ `</b>`: '') + `
                       
                       </p> </div>
                     `);
               }
            });
         });
      });

};

//populate side bar w/ attractions by time
module.exports.printAttractionsByTime = (arr)=>{
   $('#descriptionArea').html('');
   model.getParkData('areas')
      .then(areas=>{
         areas.forEach(function(area){
            arr.forEach(function(attraction){
              let attractionTimes = '';
               if(attraction.area_id === area.id){
                if(attraction.times){attractionTimes = attraction.times.join(', ');}                // console.log(attractionTimes);
                     $('#descriptionArea').append(`
                        <div class='attraction item${area.id}' id='${attraction.id}'>
                       <p><b> ${attraction.name}</b> - <span'style='color:#${area.colorTheme}'>${area.name}</span></p>
                        <p class='attrDescription' style='display:none'>
                        ${attraction.description}` + (attraction.times? `<br><br> <b>Start Times: ` + attractionTimes + `</b>`: '') + `
                        
                        </p> </div>
               `);
               }
            });
         });
      });
};

 
module.exports.highlightAreas = (list) =>{
  for(let i = 1; i < 9; i++){
    $(`#item${i}`).removeClass("highlight");
  }
  list.forEach( (area)=>{
    $(`#item${area}`).addClass("highlight");
  });
};

module.exports.highlightSelectedArea = (item) => {
  $('.gridItem').not($(`#${item}`)).toggleClass('unhighlight');
};
module.exports.removeUnhighlight = ()=>{
  $('.gridItem').removeClass('unhighlight');
};

module.exports.clearInputs= (input) => {
  let $type = $('#typeSelect');
  let $search = $('#searchInput');
  let $time = $('#time');
    switch (input) {
      case 'time':
      $search.val('');
      $type.val('');
      break;
      case 'name':
      $type.val('');
      $('#time').val(new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric"}));
      break;
      case 'area':
      $type.val('');
      $('#time').val(new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric"}));
      $search.val('');
      break;
      case 'type':
      $search.val('');
      $('#time').val(new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric"}));
      break;
    }
  };