const fetchPromises = require('node-fetch').promises;
const fetch = require('node-fetch');

const tbaKey = "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";




// This function is used to retrieve the events in a specified year, takes in the "year" parameter
async function getEvents(year){

    var eventsResp = new Array;

    await fetch(`https://www.thebluealliance.com/api/v3/events/${year}/keys?X-TBA-Auth-Key=${tbaKey}`)
        .then((response) => {
            return response.json();
        })
        .then((respJson) => {
            eventsResp = respJson;
        });

    return eventsResp; 

}


// This function is used to retrieve the teams at a specified event, takes in the "eventKey" parameter
async function getTeams(eventKey){
    var teamsResp = new Array;

    await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/keys?X-TBA-Auth-Key=${tbaKey}`)
        .then((response) => {
            return response.json();
        })
        .then((respJson) => {
            teamsResp = respJson; 
        });
        
        return teamsResp; 
}


async function processTeamAtEvent(teamKey, eventKey) {
        var resp = new Object;
          await fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/event/${eventKey}/matches?X-TBA-Auth-Key=${tbaKey}`)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            resp = myJson;
          })

          return resp;
    
        
}
 
var processedEventObject = new Object;
var counter;
 
async function processEvent(eventKey) {
    counter = 0;
   var eventTeams = await getTeams(eventKey);
   var max = eventTeams.length
   for(let i=0; i < max; i++) {
      console.log("rq #" + i + " sent");
      dummy(eventTeams[i], eventKey, max); 
   }
//    check(eventTeams.length)
}
 
function check(maxValue) {
   if(counter == maxValue) {
    // console.log(processedEventObject);
    console.log("done");
   } else {
    console.log("recieved")
   }
}
 
async function dummy(eventTeam, eventKey, maxValue) {
   processedEventObject[eventTeam.substring(3)] = await processTeamAtEvent(eventTeam, eventKey);
   counter++;
   check(maxValue);
}



async function processAllEvents() {

    var eventKeys = await getEvents('2020');

    console.log(eventKeys);
    

    console.log(teamKeys);

}


async function deleteAllDataAtEndpoint(endpoint) {

}

// processAllEvents();
processEvent('2020mndu')