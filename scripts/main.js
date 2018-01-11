"use strict";
// const $ = require('jQuery');
const model = require('./model'); 
const view = require('./view');
const controller = require('./controller');
const tp = require('../jquery.timepicker.js');
//  require('../datejs.js');
let wicked = require('../wickedpicker.js');
var moment = require('moment');

// 
$('#basicExample').wickedpicker();


// let x = moment("2018-10-10 12:00");
// let y = moment("2018-10-10 01:00");
// // let y = moment().subtract(1, 'hours');

// let xH=  x.hours();

// let yH = y.hours();
// console.log(xH - yH);
// $('#basicExample').on('input', () => {
  // console.log($('#basicExample').val());

  $('#subTime').click( () =>{
    let inputTime = $('#basicExample').val();
    console.log ($(this).val());

  });
//   // alert('what');
//   let pDate = Date.parse("3:33");
  // let nDate = Date.parseExact("12:34 PM", "hh:mm tt");

  // console.log(pDate, 'in listener');
  // let timeVal = $('#time').val();
  // console.log(timeVal, 'timeVal');
  // let inputTime = Date.parse(timeVal);

  // console.log(inputTime, 'inputTime');
  // // console.log(banana, "WHAT THE FUCK!");
  // parseTime(inputTime);
// });

//populate page w/ html 
view.populatePage();

// model.getParkData('areas') 
//    .then(areas=>{
//       view.printAreas(areas);
//    })

function compareTimes (time) {
  time = time .replace(/[\s]+/g, '');
  // console.log(time, 'get it');
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

console.log(result, 'result');
}


model.getParkData('attractions') 

   .then(attractions=>{
//       view.printAttractionsByHour(attractions);
// ..times[0]);


// function getAtTimes(){
  // console.log($('#basicExample').val(), 'in attractions');  
    attractions.forEach((at) =>  {
      if(at.times){
      //  console.log(at, 'this works');
      //  at.forEach((time) =>{
        
        // console.log(at.times);
        let AtTimes = at.times;
        AtTimes.forEach((time)=> {
          // console.log(time);
          // if(time == '9:45AM') $('#times').append(`${at.name}`);
          // if(at.id == 129){
            // console.log(time, 'in loop');
            compareTimes(time);
          // }

        });
        // for (let id in at){
          // console.log( at.times);
        // }

      // });
    }
    });
   });

  // };
   
// function parseTime(){
//   // let time =  "9:00PM"
//   // console.log(time);
//   let pDate = Date.parse("3:33");
//   // let nDate = Date.parseExact("12:34 PM", "hh:mm tt");

//   console.log(pDate, 'in function');
//   // console.log(pDate-nDate);

//   // console.log(typeof(pDate));
  

// }
// // 
// parseTime();
// d.setMinutes(minutes);

// alert(d);

//controller.activateListeners();