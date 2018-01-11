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

module.exports.retrieveAttractionsByArea=(attractions, id)=>{
  console.log('id: ',+id);
  return new Promise((resolve, reject)=>{
    let attractionsArray = [];
    attractions.forEach(function(attraction){
      // console.log('attraction.area_id',attraction.area_id);
      if(attraction.area_id === +id){
        // console.log('attraction: ', attraction);
        attractionsArray.push(attraction);
        // console.log('FUCKING WORKED');
      }
      
    });
    console.log('attrationsArray', attractionsArray);
    resolve(attractionsArray);  

  });
};
