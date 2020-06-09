const fetchPromises = require('node-fetch').promises;
const fetch = require('node-fetch');

const tbaKey = "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5"


async function getEvents(year){

    var events;

    await fetch(`https://www.thebluealliance.com/api/v3/events/${year}/keys?X-TBA-Auth-Key=${tbaKey}`)
        .then((response) => {
            return response.json();
        })
        .then((respJson) => {
            // console.log(respJson)
            events = respJson; 
            // console.log(events)

        });

    return events; 

}



async function getTeams(eventKey){
    var teams;

    await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/keys?X-TBA-Auth-Key=${tbaKey}`)
        .then((response) => {
            return response.json();
        })
        .then((respJson) => {
            // console.log(respJson)
            teams = respJson; 
        });
        
        return teams; 
}


async function main() {

    var eventsForYearKeys = await getEvents('2020');

    console.log(eventsForYearKeys);
    
    var teamsAtEventKeys = await getTeams('2020mndu');
    
    console.log(teamsAtEventKeys);

}

main()