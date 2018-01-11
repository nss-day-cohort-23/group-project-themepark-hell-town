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


//populate side bar w/ clicked attractions
module.exports.printAttractionsByArea = (attractionsArray)=>{
   $('#descriptionArea').html('');

   model.getParkData('attraction_types')
      .then(types=>{
         types.forEach(function(type){
            attractionsArray.forEach(function(attraction){

               if(attraction.type_id === type.id){
                     $('#descriptionArea').append(`
                        <p>${attraction.name} - <b>${type.name}</b></p>
                     `);
               }
            });
         });
      });
};

//populate side bar w/ attractions by time
module.exports.printAttractionsByArea = (attractionsArray)=>{
   $('#descriptionArea').html('');

   model.getParkData('attraction_types')
      .then(types=>{
         types.forEach(function(type){
            attractionsArray.forEach(function(attraction){

               if(attraction.type_id === type.id){
                     $('#descriptionArea').append(`
                        <p>${attraction.name} - <b>${type.name}</b></p>
                     `);
               }
            });
         });
      });
};

 
