const fetch = require('node-fetch');
const admin = require('firebase-admin')

fireApp = admin.initializeApp();

var teamTotal = 0;
var autoAvg = 0;
var autoTotal = 0;
var autoArray = [];
var tOPAvg = 0;
var tOPTotal = 0;
var tOPArray = [];
var eventScoreArray = [];
var outerArray = [];
var innerArray = [];
var bottomArray = [];
var bottomAvg = 0;
var bottomVar = 0;
var innerAvg = 0;
var innerVar = 0;
var outerAvg = 0;
var outerVar = 0;
var teamAlliance = "";


// class team {
//   constructor(team_number) {
//     this.teamNum = team_number;
//   }
//
// }
//
//
// var pH3 = 1;
// callEvents(2019);
//
// // for() {
// // pH3++;
// // callEvents(2019);
// // }
// //This function is the loop that runs through every event. It jsut repeatedly calls callTeams() with different eKey's
// function callEvents(year) {
//   var pH1 = "https://www.thebluealliance.com/api/v3/events/" + year + "/keys?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
//   let pH2 = new URL(pH1);
//
//   fetch(pH2)
//     .then((response) => {
//       return response.json();
//     })
//     .then((myJson) => {
//       console.log(myJson.length);
//       callTeams(myJson[pH3]);
// });
// }
//
//
// //This function is the loop that runs throgh every team. it just repeteadly calls process() with different tkey-ekey pairs
// function callTeams(eKey) {
//   console.log("Calling the data for the event " + eKey);
//   var pH4 = "https://www.thebluealliance.com/api/v3/event/" + eKey + "/teams/keys?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
//   let pH5 = new URL(pH4);
//
//   fetch(pH5)
//     .then((response) => {
//       return response.json();
//     })
//     .then((myJson) => {
//       if(myJson.length == 0) {
//
//       } else {
//       var pH6;
//       for(pH6 = 0; pH6<myJson.length; pH6++) {
//         process(myJson[pH6], eKey);
//       }
//     }
// });
// }

process("frc2264","2020mndu");
//This function takes a team and an event and processes it, spitting out rank, avgs, and whatever else we wanted
function process(tKey, eKey) {

        var fff = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/event/" + eKey + "/matches?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
        let ok = new URL(fff);

        fetch(ok)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            console.log("team " + tKey + " at event " + eKey);
            console.log(myJson);
            // String teamNum = yourStringVariable.Substring(0,5);

            resetVariables();

            var theJson = myJson;

            for(var matchNum = 0; matchNum < theJson.length; matchNum++) {
            blueKeyArray = theJson[matchNum].alliances.blue.team_keys;

            if(theJson[matchNum].alliances.blue.score >= 0) {
            if(blueKeyArray.includes(tKey)) {

              teamTotal += theJson[matchNum].alliances.blue.score;
              outerVar += theJson[matchNum].score_breakdown.blue.autoCellsOuter + theJson[matchNum].score_breakdown.red.teleopCellsOuter;
              innerVar += theJson[matchNum].score_breakdown.blue.autoCellsInner + theJson[matchNum].score_breakdown.red.teleopCellsInner;
              bottomVar += theJson[matchNum].score_breakdown.blue.autoCellsBottom + theJson[matchNum].score_breakdown.red.teleopCellsBottom;
              autoTotal += theJson[matchNum].score_breakdown.blue.autoPoints;
              tOPTotal += theJson[matchNum].score_breakdown.blue.teleopPoints;
            } else {
              teamTotal += theJson[matchNum].alliances.red.score;
              outerVar += theJson[matchNum].score_breakdown.red.autoCellsOuter + theJson[matchNum].score_breakdown.red.teleopCellsOuter;
              innerVar += theJson[matchNum].score_breakdown.red.autoCellsInner + theJson[matchNum].score_breakdown.red.teleopCellsInner;
              bottomVar += theJson[matchNum].score_breakdown.red.autoCellsBottom + theJson[matchNum].score_breakdown.red.teleopCellsBottom;
              autoTotal += theJson[matchNum].score_breakdown.red.autoPoints;
              tOPTotal += theJson[matchNum].score_breakdown.red.teleopPoints;
            }
          }


            }

            //NOTE: THE JSONS LENGTH IS NOT THE CORRECT DIVISOR FOR LIVE GAMES< INSTEAD HAVE A LOOP WHEN COUNTING
            console.log(tOPTotal/theJson.length);
          });
    }


function resetVariables() {
  teamTotal = 0;
  autoAvg = 0;
  autoTotal = 0;
  autoArray = [];
  tOPAvg = 0;
  tOPTotal = 0;
  tOPArray = [];
  eventScoreArray = [];
  outerArray = [];
  innerArray = [];
  bottomArray = [];
  bottomAvg = 0;
  bottomVar = 0;
  innerAvg = 0;
  innerVar = 0;
  outerAvg = 0;
  outerVar = 0;
  teamAlliance = "";
  theJson = "";
}
