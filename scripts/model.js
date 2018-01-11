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
         console.log('data',data);
      })
      .fail(error=>{
         reject(error);
      });
   });
};

// module.exports.findAttractionsByHour=(data, hr)=>{
//    for
// }

module.exports.findAttractionsByArea=(data,id)=>{
   // console.log(data, id);
};


