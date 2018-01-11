"use strict";

// fill page w html content
module.exports.populatePage=()=>{
   $('.nav').append(`
      <ul class='navItems'>
         <li id='brand'>Hell Town</li>
         <li>
            <input id='searchInput' type="text">
         </li>
      </ul>
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

//populate side bar w/ current attractions
module.exports.printAttractions = (attractionsArray)=>{
  attractionsArray.forEach(function(attraction){
    console.log('attraction: ', attraction);
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