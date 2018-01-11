"use strict";
const $ = require('jquery');

//XHR request(s) for data, takes data section as parameter
module.exports.getParkData = (section)=>{
   console.log('attractions incoming oh shiiiiiit!!!!');
   return new Promise((resolve, reject)=>{
      $.ajax({
         url: `https://theme-park-project.firebaseio.com/theme-park/${section}.json`,
         dataType: 'json'  
      })
      .done(data =>{
         resolve(data);
         console.log('data',data);
      })
      .fail(error=>{
         reject(error);
      });
   });
};

// module.exports.retrieveAttractionsByHour=(attractions, hr)=>{
   
// };

module.exports.retrieveAttractionsByArea=(areas, id)=>{
  console.log('id: ',id);
  areas.forEach(function(value){
    console.log('test', value);

  });
};
