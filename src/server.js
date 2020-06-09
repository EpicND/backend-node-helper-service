const fetch = require('node-fetch');
var firebaseAdmin = require('firebase-admin');



const ytdl = require('ytdl-core');
const serviceAcc = require('../fbToken.json');

var app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAcc),
    databaseURL: "https://frc-scouting-epicnd.firebaseio.com"
  });
const database = app.database();
var db = firebaseAdmin.database();


test();

function test() {

}

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






console.time()
var cury = 2019;

caller();
function caller() {
if(cury>2014) {
  callEvents(cury);
  cury--
setTimeout(function(){
  caller()
}, 600000);
}
}

//This function is the loop that runs through every event. It jsut repeatedly calls callTeams() with different eKey's
function callEvents(year) {
  var pH1 = "https://www.thebluealliance.com/api/v3/events/" + year + "/keys?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
  let pH2 = new URL(pH1);

  fetch(pH2)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      // console.log(myJson.length);
      // // console.log(myJson);
      // // console.log()
    var pH3 = 0;
    kbuddy();
    pH3 = 6;

    function kbuddy() {
      callTeams(myJson[pH3], year, 1000);
      pH3++;
      callTeams(myJson[pH3], year, 2000);
      pH3++;
      callTeams(myJson[pH3], year, 3000);
      pH3++;
      callTeams(myJson[pH3], year, 4000);
        if(pH3 <myJson.length) {
          setTimeout(function(){
          pH3++;
          kbuddy();
      }, 7500);
      }
    }
});
}

// callTeams("2020mndu", 2020);
//This function is the loop that runs throgh every team. it just repeteadly calls process() with different tkey-ekey pairs
var pH6 = 0;

function callTeams(eKey, year, u) {
  // console.log("Calling the data for the event " + eKey);
  var pH4 = "https://www.thebluealliance.com/api/v3/event/" + eKey + "/teams/keys?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
  let pH5 = new URL(pH4);

  fetch(pH5)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      if(myJson.length == 0) {

      } else {

      // epic1();
      done = false;
      var x = 1;
      for(pH6 = 0; pH6 < myJson.length; pH6++) {
          if(x == 1) {
          process(myJson[pH6], eKey, year, "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5", pH6 + u);
          var ref = db.ref("/" + year);
          x=0;
        } else {
          process(myJson[pH6], eKey, year, "eGAeqTgTHJcHhMWBaTToL9qihuJLsHobLS64C5HsfZBB2t3csdxzngRuOMjLrWLf", pH6 + u);
          x=1;
        }
      }

    }
});
}

// process("frc2264", "2020mndu", 2020, "eGAeqTgTHJcHhMWBaTToL9qihuJLsHobLS64C5HsfZBB2t3csdxzngRuOMjLrWLf", 0);

//This function takes a team and an event and processes it, spitting out rank, avgs, and whatever else we wanted



function process(tKey, eKey, year, apiKey, u) {
          var u = pH6;
          var ref = db.ref("/"+ year + "/" + eKey);
          ref.update({
            [tKey] : {
              "ph" : "ph"
            },
          })
          resetVariables();

          var eee = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/events/" + year + "/statuses?X-TBA-Auth-Key=" + apiKey;
          let ok2 =  new URL(eee);
          fetch(ok2)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            resetVariables2();

            this["teamWLRequestObj" + u] = myJson;
            this["wltRec" + u] = this["teamWLRequestObj" + u][String(eKey)];
            // // console.log(wltRec);

            if(this["wltRec" + u].qual == null && this["wltRec" + u].playoff == null) {
              // console.log(myJson);
            } else {
            if(this["wltRec" + u].playoff == null && this["wltRec" + u].qual != null) {
              // // console.log(tKey + "not in playoffs");
              this["wins" + u] = this["wltRec" + u].qual.ranking.record.wins;
              this["losses" + u] = this["wltRec" + u].qual.ranking.record.losses;
              this["ties" + u] = this["wltRec" + u].qual.ranking.record.ties;
              this["wltratio" + u] = (this["wins" + u]/(this["wins" + u]+this["losses" + u]+this["ties" + u])).toFixed(2);
              var ref = db.ref("/"+ year + "/" + eKey + "/" + tKey);
              ref.update({
                  "wltratio" : this["wltratio" + u],
              })
              // console.log(this["wins" + u])
              // console.log("Processing finished " + tKey + " at event " + eKey);
              // console.log(tKey + " " + this["wltratio" + u]);
          } else if(wltRec.playoff != null && wltRec.qual != null) {
            inPlayoffs = true;
              this["wins" + u] = this["wltRec" + u].playoff.record.wins + this["wltRec" + u].qual.ranking.record.wins;
              this["losses" + u] = this["wltRec" + u].playoff.record.losses + this["wltRec" + u].qual.ranking.record.losses;
              this["ties" + u] = this["wltRec" + u].playoff.record.ties + this["wltRec" + u].qual.ranking.record.ties;
              this["wltratio" + u] = (this["wins" + u]/(this["wins" + u]+this["losses" + u]+this["ties" + u])).toFixed(2);
              var ref = db.ref("/"+ year + "/" + eKey + "/" + tKey);
              ref.update({
                  "wltratio" : this["wltratio" + u],
              })
              // console.log(this["wins" + u])
              // console.log("Processing finished " + tKey + " at event " + eKey);
              // console.log(tKey + " " + this["wltratio" + u]);
          } else {
            this["wins" + u] = this["wltRec" + u].playoff.record.wins;
            this["losses" + u] = this["wltRec" + u].playoff.record.losses;
            this["ties" + u] = this["wltRec" + u].playoff.record.ties;
            this["wltratio" + u] = (this["wins" + u]/(this["wins" + u]+this["losses" + u]+this["ties" + u])).toFixed(2);
            var ref = db.ref("/"+ year + "/" + eKey + "/" + tKey);
            ref.update({
                "wltratio" : this["wltratio" + u],
            })
            // console.log(this["wins" + u])
            // console.log("Processing finished " + tKey + " at event " + eKey);
            // console.log(tKey + " " + this["wltratio" + u]);
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
            // console.log("team " + tKey + " at event " + eKey);

            this["teamTotal" + u] = 0;
            this["autoAvg" + u] = 0;
            this["autoTotal" + u] = 0;
            this["tOPAvg" + u] = 0;
            this["tOPTotal" + u] = 0;
            this["bottomAvg" + u] = 0;
            this["bottomVar" + u] = 0;
            this["innerAvg" + u] = 0;
            this["innerVar" + u] = 0;
            this["outerAvg" + u] = 0;
            this["outerVar" + u] = 0;
            this["blueKeyArray" + u] = [];


            this["teamScoreRequestObj" + u] = myJson;

            for(this["matchNum" + u] = 0; this["matchNum" + u] < this["teamScoreRequestObj" + u].length; this["matchNum" + u]++) {
            this["blueKeyArray" + u] = this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances.blue.team_keys;

            if(this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances.blue.score >= 0) {
              gamesPlayed++;
            if(this["blueKeyArray" + u].includes(tKey)) {
              if(this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances == undefined || this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances == null || this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown == null || this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown == undefined) {
                  // console.log("----- ERROR: " + tKey + " at " + eKey + " -----");
                  // console.log(this["teamScoreRequestObj" + u]);
              } else {
              this["teamTotal" + u] += this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances.blue.score;
              outerVar += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.blue.autoCellsOuter + this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.teleopCellsOuter;
              innerVar += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.blue.autoCellsInner + this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.teleopCellsInner;
              bottomVar += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.blue.autoCellsBottom + this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.teleopCellsBottom;
              this["autoTotal" + u] += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.blue.autoPoints;
              this["tOPTotal" + u] += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.blue.teleopPoints;
            }
              // counter2++;
            } else {
              if(this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances == undefined || this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances == null || this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown == null || this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown == undefined ) {
                  // console.log("----- ERROR: " + tKey + " at " + eKey + " -----");
                  // console.log(this["teamScoreRequestObj" + u][this["matchNum" + u]]);
              } else {
              this["teamTotal" + u] += this["teamScoreRequestObj" + u][this["matchNum" + u]].alliances.red.score;
              outerVar += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.autoCellsOuter + this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.teleopCellsOuter;
              innerVar += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.autoCellsInner + this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.teleopCellsInner;
              bottomVar += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.autoCellsBottom + this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.teleopCellsBottom;
              this["autoTotal" + u] += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.autoPoints;
              this["tOPTotal" + u] += this["teamScoreRequestObj" + u][this["matchNum" + u]].score_breakdown.red.teleopPoints;
            }
            }
          }


            }
            this["teamAvg" + u] = (this["teamTotal" + u]/this["teamScoreRequestObj" + u].length).toFixed(2);
            this["autoAvg" + u] = (this["autoTotal" + u]/this["teamScoreRequestObj" + u].length).toFixed(2);
            this["tOPAvg" + u] = (this["tOPTotal" + u]/this["teamScoreRequestObj" + u].length).toFixed(2);
            outerAvg = (outerVar/this["teamScoreRequestObj" + u].length).toFixed(2);
            innerAvg = (innerVar/this["teamScoreRequestObj" + u].length).toFixed(2);
            bottomAvg = (bottomVar/this["teamScoreRequestObj" + u].length).toFixed(2);
            this["teamTotal" + u];
            wins;
            losses;
            ties;

            var ref = db.ref("/"+ year + "/" + eKey + "/" + tKey);
            ref.update({
                "averages" : {
                  "avg" : this["teamAvg" + u],
                  "autoAvg" : this["autoAvg" + u],
                  "tOPAvg" : this["tOPAvg" + u],
                },
                "inPlayoffs" : inPlayoffs,
                "games" : this["teamScoreRequestObj" + u].length
            })
            inPlayoffs;

            // console.log("Processing finished " + tKey + " at event " + eKey);
            // console.log(tKey + " " + this["autoAvg" + u]);


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
  teamScoreRequestObj = "";
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

console.timeEnd()
