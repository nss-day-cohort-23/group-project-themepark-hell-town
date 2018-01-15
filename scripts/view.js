"use strict";
const model = require('./model'); 


// fill page w html content
module.exports.populatePage=()=>{
  let d = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
   $('.nav').append(`
      <ul class='navItems'>
         <li id='brand'>Hell Town
          <img class="coaster" src="images/wheel.svg">
         </li>
         <li>
            <input id='searchInput' type="text" placeholder=" Search">
            <img class="searchIcon" src="images/magnifier.svg">
         </li>
      </ul>
   `);

   $('footer').append(`
      <div class='footer'><p>Copyright ${d}</p></div>
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
                       ${attraction.description}` + (attraction.times? `<br><br> <b>Start Times: ` + attractionTimes + `</b>`: '') + `
                       <br><button class='itinerary' type='button'>Add to Itinerary</button>
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
                  if(attraction.times){ attractionTimes = attraction.times.join(', ');}
                     $('#descriptionArea').append(`
                        <div class='attraction item${area.id}' id='${attraction.id}'>
                       <p><b> ${attraction.name}</b> - <span style='color:#${area.colorTheme}'>${area.name}</span></p>
                        <p class='attrDescription' style='display:none'>
                        ${attraction.description}` + (attraction.times? `<br><br> <b>Start Times: ` + attractionTimes + `</b>`: '') + `
                        <br><button class='itinerary' type='button'>Add to Itinerary</button>
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


  module.exports.printItinerary = (valuesArray)=>{
    $('#descriptionArea').html('');
    $('#descriptionArea').html('');
    let areasArray = [];
    let typesArray = [];
    model.getParkData('areas')
       .then(areas=>{
          areas.forEach(function(area){
            areasArray.push(area);
          }
        );
      });
    model.getParkData('attraction_types')
    .then(types=>{
        types.forEach(function(type){
          typesArray.push(type);
        }
      );
    });
    model.getParkData('attractions')
       .then(attractions=>{
          attractions.forEach(function(attraction){
             valuesArray.forEach(function(entry){
               let attractionTimes = '';
               if(attraction.id === +entry){
                 if(attraction.times){ attractionTimes = attraction.times.join(', ');}
                 let area_id = attraction.area_id;
                 let type_id = attraction.type_id;
                 areasArray.forEach(function(area){
                  typesArray.forEach(function(type){
                   if(area_id === area.id){
                     if(type_id === type.id){
                       $('#descriptionArea').append(`
                       <div class='attraction item${area_id}' id='${attraction.id}'>
                       <p><b>${attraction.name}</b> - <span>(${type.name})</span>
                       <span style='color:#${area.colorTheme}'>${area.name}</span></p>
                       <p class='attrDescription' style='display:none'>
                       ${attraction.description}` + (attraction.times? `<br>
                       <br> <b>Start Times: ` + attractionTimes + `</b>`: '') + `
                       <button id='deleteFromItinerary' type='button'>Remove from Itinerary</button>
                       </p> </div>
                       `);
                      }
                    }
                    }
                  );
                  });
                }
             });
            });
          });
        };
       
