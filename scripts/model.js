"use strict";
// const $ = require('jquery');

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


module.exports.formatTimes =  (time) => {
  time = time .replace(/[\s]+/g, '');
  if(time.slice(0,2)!= '12' && time.charAt(4) === 'P'){
    if(time.charAt(1) == ':'){
      time = '0' + time;
    }
    let firstDigs = time.slice(0,2);
    let Added = parseInt(firstDigs)+12;
    
    time = Added + time.slice(3);
    // console.log(time, 'in if');
    // console.log(time);
  }
  let result = time.replace(/[^0-9]+/g, '');
  return result;
};
