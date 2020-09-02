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
 


//processes a specific event, useful for faster async operations and abstracted for webhook integration
async function processEvent(eventKey) {
    var processedEventObject = new Object;
    var eventTeams = await getTeams(eventKey);
    var promiseArray = new Array;
    for(let i=0; i < eventTeams.length; i++) {
        processTeamAtEvent(eventTeams[i], eventKey).then((returns) => {
            processedEventObject[eventTeams[i].substring(3)] = returns;
        })
        // promiseArray.push(processTeamAtEvent(eventTeams[i], eventKey))
    }

    // await Promise.all(promiseArray).then((vals) => {
    //     for(i=0; i<vals.length; i++) {
    //         curVal = vals[i];
    //         processedEventObject = {...processedEventObject, ...vals[i]};
    //     }
    // })
    
    console.log(processedEventObject)   
    // TODO: Retrieve and process data for every team at event
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