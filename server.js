const fetch = require('node-fetch');

class team {
  constructor(team_number) {
    this.teamNum = team_number;
  }

}


var pH3 = 1;
callEvents(2019);

// for() {
// pH3++;
// callEvents(2019);
// }
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
      callTeams(myJson[pH3]);
});
}


//This function is the loop that runs throgh every team. it just repeteadly calls process() with different tkey-ekey pairs
function callTeams(eKey) {
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
      var pH6;
      for(pH6 = 0; pH6<myJson.length; pH6++) {
        process(myJson[pH6], eKey);
      }
    }
});
}


//This function takes a team and an event and processes it, spitting out rank, avgs, and whatever else we wanted
function process(tKey, eKey) {

        var fff = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/event/" + eKey + "/matches/?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
        let ok = new URL(fff);

        fetch(ok)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            console.log("team " + tKey + " at event " + eKey);
            console.log(myJson);



              //EXTRACTION OF NECCESARY DATA

          });
    }
