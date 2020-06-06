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
var gamesPlayed = 0;

var WLTRec = 0;
var wltrec = 0;
var wins= 0;
var losses = 0;
var ties = 0;
var teamWLRequestObj;
var wltratio;

var done;
var inPlayoffs;





class team {
  constructor(team_number) {
    this.teamNum = team_number;
  }

}


// var pH3 = 1;
callEvents(2020);

//This function is the loop that runs through every event. It jsut repeatedly calls callTeams() with different eKey's
function callEvents(year) {
  var pH1 = "https://www.thebluealliance.com/api/v3/events/" + year + "/keys?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
  let pH2 = new URL(pH1);

  fetch(pH2)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson.length);
      // console.log(myJson);
      // console.log()
    var pH3 = 0;
    kbuddy();
    pH3 = 6;
    function kbuddy() {
      callTeams(myJson[pH3], year);
      pH3++;
      callTeams(myJson[pH3], year);
        if(pH3 <myJson.length) {
          setTimeout(function(){
          pH3++;
          kbuddy();
      }, 7500);
      }
    }
});
}

// callTeams("2020mndu");
//This function is the loop that runs throgh every team. it just repeteadly calls process() with different tkey-ekey pairs
function callTeams(eKey, year) {
  console.log("Calling the data for the event " + eKey);
  var pH4 = "https://www.thebluealliance.com/api/v3/event/" + eKey + "/teams/keys?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
  let pH5 = new URL(pH4);

  fetch(pH5)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      if(myJson.length == 0) {

      } else {
      var pH6 = 0;
      // epic1();
      done = false;
      var x = 1;
      for(pH6 = 0; pH6 < myJson.length; pH6++) {
          if(x == 1) {
          process(myJson[pH6], eKey, year, "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
          x=0;
        } else {
          process(myJson[pH6], eKey, year, "eGAeqTgTHJcHhMWBaTToL9qihuJLsHobLS64C5HsfZBB2t3csdxzngRuOMjLrWLf");
          x=1;
        }
      }

    }
});
}

// process("frc4537", "2019audd", 2019);

//This function takes a team and an event and processes it, spitting out rank, avgs, and whatever else we wanted



function process(tKey, eKey, year, apiKey) {
          resetVariables();

          var eee = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/events/" + year + "/statuses?X-TBA-Auth-Key=" + apiKey;
          let ok2 =  new URL(eee);
          fetch(ok2)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            resetVariables2();

            teamWLRequestObj = myJson;
            wltRec = teamWLRequestObj[String(eKey)];

            if(!wltRec) {

            } else {
            if(wltRec.playoff == null) {
              wins = wltRec.qual.ranking.record.wins;
              losses = wltRec.qual.ranking.record.losses;
              ties = wltRec.qual.ranking.record.ties;
              wltratio = (wins/(wins+losses)).toFixed(2);
              console.log("Processing finished " + tKey + " at event " + eKey);
              console.log(tKey + " " + wltratio);
          } else {
            inPlayoffs = true;
              wins = wltRec.playoff.record.wins + wltRec.qual.ranking.record.wins;
              losses = wltRec.playoff.record.losses + wltRec.qual.ranking.record.losses;
              ties = wltRec.playoff.record.ties + wltRec.qual.ranking.record.ties;
              wltratio = (wins/(wins+losses)).toFixed(2);
              console.log("Processing finished " + tKey + " at event " + eKey);
              console.log(tKey + " " + wltratio);
          }
          }
          });




        var fff = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/event/" + eKey + "/matches?X-TBA-Auth-Key=" + apiKey;
        let ok = new URL(fff);

        fetch(ok)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            console.log("team " + tKey + " at event " + eKey);
            // console.log(myJson);
            // String teamNum = yourStringVariable.Substring(0,5);




            var theJson = myJson;

            for(var matchNum = 0; matchNum < theJson.length; matchNum++) {
            blueKeyArray = theJson[matchNum].alliances.blue.team_keys;

            if(theJson[matchNum].alliances.blue.score >= 0) {
              gamesPlayed++;
            if(blueKeyArray.includes(tKey)) {
              if(theJson[matchNum].alliances == undefined || theJson[matchNum].alliances == null || theJson[matchNum].score_breakdown == null || theJson[matchNum].score_breakdown == undefined) {
                  console.log("----- ERROR: " + tKey + " at " + eKey + " -----");
              } else {
              teamTotal += theJson[matchNum].alliances.blue.score;
              outerVar += theJson[matchNum].score_breakdown.blue.autoCellsOuter + theJson[matchNum].score_breakdown.red.teleopCellsOuter;
              innerVar += theJson[matchNum].score_breakdown.blue.autoCellsInner + theJson[matchNum].score_breakdown.red.teleopCellsInner;
              bottomVar += theJson[matchNum].score_breakdown.blue.autoCellsBottom + theJson[matchNum].score_breakdown.red.teleopCellsBottom;
              autoTotal += theJson[matchNum].score_breakdown.blue.autoPoints;
              tOPTotal += theJson[matchNum].score_breakdown.blue.teleopPoints;
            }
              // counter2++;
            } else {
              if(theJson[matchNum].alliances == undefined || theJson[matchNum].alliances == null || theJson[matchNum].score_breakdown == null || theJson[matchNum].score_breakdown == undefined ) {
                  console.log("----- ERROR: " + tKey + " at " + eKey + " -----");
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


            }

            autoAvg = (autoTotal/theJson.length).toFixed(2);
            tOPAvg = (tOPTotal/theJson.length).toFixed(2);
            outerAvg = (outerVar/theJson.length).toFixed(2);
            innerAvg = (innerVar/theJson.length).toFixed(2);
            bottomAvg = (bottomVar/theJson.length).toFixed(2);
            teamTotal;
            wins;
            losses;
            ties;

            inPlayoffs;

            console.log("Processing finished " + tKey + " at event " + eKey);
            console.log(tKey + " " + autoAvg);

            if(matchNum = theJson.length) {
            done = true;
          }

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
  gamesPlayed = 0;
  wltratio = 0;
  inPlayoffs = false;
}

function resetVariables2() {
    WLTRec = 0;
    wltRec = "";
    teamWLRequestObj = "";
    wins = 0;
    losses = 0;
    ties = 0;
}
