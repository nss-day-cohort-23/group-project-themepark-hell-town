"use strict";   

//XHR request(s) for data, takes data section as parameter
module.exports.getParkData = (section)=>{
   return new Promise((resolve, reject)=>{
      $.ajax({
         url: `https://theme-park-project.firebaseio.com/theme-park/${section}.json`,
         dataType: 'json'  
      })
      .done(data =>{
         resolve(data);
      })
      .fail(error=>{
         reject(error);
      });
   });
};


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


module.exports.formatTimes =  (time) => {
  time = time .replace(/[\s]+/g, '');
  if(time.slice(0,2)!= '12' && time.charAt(4) === 'P'){
    if(time.charAt(1) == ':'){
      time = '0' + time;
    }
    let firstDigs = time.slice(0,2);
    let Added = parseInt(firstDigs)+12;
    time = Added + time.slice(3);
  }
  let result = time.replace(/[^0-9]+/g, '');
  return result;
};

// module.exports.retrieveTypesById=(types,id)=>{
//    return new Promise((resolve, reject)=>{
      
//    })
// }
