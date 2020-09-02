const fetchPromises = require('node-fetch').promises;
const fetch = require('node-fetch');

const tbaKey = "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
// const firebaseAdmin = require('firebase-admin')
// const serviceAcc = require('../fbToken.json');

// var app = firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(serviceAcc),
//     databaseURL: "https://frc-scouting-epicnd.firebaseio.com"
// });
// const database = app.database();
// var db = firebaseAdmin.database();


// This function is used to retrieve the events in a specified year, takes in the "year" parameter
async function getEvents(year) {

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
async function getTeams(eventKey) {
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
        .then(async (myJson) => {
            await processData(eventKey.substring(0, 4), myJson, teamKey)
        })

    return resp;


}



async function processEvent(eventKey) {
    var processedEventObject = new Object;
    var counter = new Number;
    counter = 0;
    var eventTeams = await getTeams(eventKey);
    var max = eventTeams.length
    for (let i = 0; i < max; i++) {
        console.log("rq #" + i + " sent");
        dummy(eventTeams[i], eventKey, max);
    }

    function check(maxValue) {
        if (counter == maxValue) {
            //  console.log(processedEventObject);
            //  console.log("done");
        } else {
            //  console.log("recieved")
        }
    }

    async function dummy(eventTeam, eventKey, maxValue) {
        processedEventObject[eventTeam.substring(3)] = await processTeamAtEvent(eventTeam, eventKey);
        counter++;
        check(maxValue);
    }

    //    check(eventTeams.length)
}

async function process2020(data, teamKey) {
    var processed = new Object;
    //final score data
    var teleOPAverage, autoAverage, innerAverage, outerAverage, totalAverage, winRate = 0;
    var ties = 0;
    var wins = 0;
    //numbers used to calculate averages
    var teleOPTotal, autoTotal, innerTotal, outerTotal, bottomTotal, totalTotal = 0;
    var matchesPlayed = 0;
    // if (teamKey === 'frc2264') console.log(data[0])
    for (let i = 0; i < data.length; i++) {

        if (data[i].winning_alliance) {
            matchesPlayed++;
            switch (data[i].winning_alliance) {
                case 'blue':
                    if (data[i].alliances.blue.team_keys.indexOf(teamKey) > -1) {
                        handleData(data[i].score_breakdown.blue);
                        wins++;
                    } else {
                        handleData(data[i].score_breakdown.red)
                    }
                    break;
                case 'red':
                    if (data[i].alliances.red.team_keys.indexOf(teamKey) > -1) {
                        handleData(data[i].score_breakdown.red);
                        wins++;
                    } else {
                        handleData(data[i].score_breakdown.blue)
                    }
                    break;
                default:
                    if (data[i].alliances.red.team_keys.indexOf(teamKey) > -1) {
                        handleData(data[i].score_breakdown.red);
                    } else {
                        handleData(data[i].score_breakdown.blue)
                    }
                    ties++;
                    break;
            }
        }
    }

    function handleData(data) {
        totalTotal += data.totalPoints;
        teleOPTotal += data.teleopPoints;
        autoTotal += data.autoPoints;
        innerTotal += data.teleopCellsInner;
        bottomTotal += data.teleopCellsBottom;
        outerTotal += data.teleopCellsOuter;
        // if(teamKey === 'frc2264') console.log(totalTotal)
        // console.log('handling data', [teamKey])
    }
        totalAverage = totalTotal/matchesPlayed;
        winRate = (wins/(matchesPlayed - ties));


}

async function processData(year, data, teamKey) {
    var response = new Object;
    switch (year) {
        case '2020':
            response = await process2020(data, teamKey);
            break;
        case '2019':
            response = await process2019(data);
            break;
    }
    return response;
}



async function processAllEventsInYear(year) {

    var eventKeys = await getEvents('2020');

    console.log(eventKeys);


    console.log(teamKeys);

}


async function deleteAllDataAtEndpoint(endpoint) {

}

// processAllEvents();
processEvent('2020caln')