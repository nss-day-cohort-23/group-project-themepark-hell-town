"use strict";
const $ = require('jquery');

//XHR request(s) for data
module.exports.getAttractions = ()=>{
   console.log('attractions incoming oh shiiiiiit!!!!');
   return new Promise((resolve, reject)=>{
      $.ajax({
         url: "https://theme-park-project.firebaseio.com/attractions.json",
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

module.exports.getAreas = () => {
   console.log('attractions incoming oh shiiiiiit!!!!');
   return new Promise((resolve, reject) => {
      $.ajax({
         url: "https://theme-park-project.firebaseio.com/areas.json",
         dataType: 'json'
      })
         .done(data => {
            resolve(data);
            console.log('data', data);
         })
         .fail(error => {
            reject(error);
         });
   });
};

module.exports.getAttractionType = () => {
   console.log('attractions incoming oh shiiiiiit!!!!');
   return new Promise((resolve, reject) => {
      $.ajax({
         url: "https://theme-park-project.firebaseio.com/attraction_types.json",
         dataType: 'json'
      })
         .done(data => {
            resolve(data);
            console.log('data', data);
         })
         .fail(error => {
            reject(error);
         });
   });
};

