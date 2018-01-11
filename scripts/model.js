"use strict";
const $ = require('jquery');

//XHR request(s) for data, takes data section as parameter
module.exports.getParkData = (section)=>{
   return new Promise((resolve, reject)=>{
      $.ajax({
         url: `https://theme-park-project.firebaseio.com/theme-park/${section}.json`,
         dataType: 'json'  
      })
      .done(data =>{
         resolve(data);
        //  console.log('data',data);

      })
      .fail(error=>{
         reject(error);
      });
   });
};

// module.exports.retrieveAttractionsByHour=(attractions, hr)=>{
   
// };

module.exports.retrieveAreaByAttraction=(attractions, searchInput)=>{
  return new Promise((resolve, reject)=>{
    let searchResults = [];
    attractions.forEach(function(attraction){
      if(attraction.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1){
        searchResults.push(attraction);
      }
    });
    resolve(searchResults);
  });
};

module.exports.retrieveAttractionsByArea=(attractions, id)=>{
  return new Promise((resolve, reject)=>{
    let attractionsArray = [];
    attractions.forEach(function(attraction){
      if(attraction.area_id === +id){
        attractionsArray.push(attraction);
      }
    });
    resolve(attractionsArray);  
  });
};
