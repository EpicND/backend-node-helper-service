const fetchPromises = require('node-fetch').promises;
const fetch = require('node-fetch');

const tbaKey = "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
const firebaseAdmin = require('firebase-admin')
const serviceAcc = require('../fbToken.json');


var app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAcc),
    databaseURL: "https://frc-scouting-epicnd.firebaseio.com"
  });
const database = app.database();
var db = firebaseAdmin.database();



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
    var resp;
    await fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/event/${eventKey}/matches?X-TBA-Auth-Key=${tbaKey}`)
        .then((response) => {
            return response.json();
        })
        .then(async (myJson) => {
            if(myJson == []) {
                resp = null;
            } else {
                resp = await processData('2020', myJson, teamKey);
            }
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
        dummy(eventTeams[i], eventKey, max);
    }

    function check(maxValue) {
        if (counter == maxValue) {
            console.log("done" + eventKey);
            pushDatatoFB("2020", eventKey, processedEventObject);

        } else {

        }
    }

    async function dummy(eventTeam, eventKey, maxValue) {
        processedEventObject[eventTeam.substring(3)] = await processTeamAtEvent(eventTeam, eventKey);
        counter++;
        check(maxValue);
    }


}

function pushDatatoFB(year, event, data) {
    var ref = db.ref("/"+ year);
    ref.update({
        [event] : data,
    })

}


async function process2020(data, teamKey) {
    var processed = new Object;
    //final score data
    var bottomAverage = 0;
    var teleOPAverage = 0;
    var autoAverage = 0;
    var innerAverage = 0;
    var outerAverage = 0;
    var totalAverage = 0
    var winRate = 0;

    var ties = 0;
    var wins = 0;

    //numbers used to calculate averages
    var teleOPTotal = 0;
    var autoTotal = 0;
    var innerTotal = 0;
    var outerTotal = 0;
    var bottomTotal = 0;
    var totalTotal = 0;

    var matchesPlayed = 0;

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
    }
        totalAverage = totalTotal/matchesPlayed;
        winRate = (wins/matchesPlayed);
        teleOPAverage = teleOPTotal/matchesPlayed;
        autoAverage = autoTotal/matchesPlayed;
        innerAverage = innerTotal/matchesPlayed;
        bottomAverage = bottomTotal/matchesPlayed
        outerAverage = outerTotal/matchesPlayed;



        var returnObject = new Object;

        returnObject["games"] = matchesPlayed;
        returnObject["wlt"] = {
            "wins": wins,
            "losses": matchesPlayed - ties - wins,
            "ties": ties
        }
        returnObject["averages"] = {
            "avg": totalAverage.toFixed(2),
            "tOPAvg": teleOPAverage.toFixed(2),
            "autoAvg": autoAverage.toFixed(2),
            "innerAvg": innerAverage.toFixed(2),
            "bottomAvg": bottomAverage.toFixed(2),
            "outerAvg":outerAverage.toFixed(2),
            "wltRate": winRate.toFixed(2)
        }

        return returnObject;
        // console.log(returnObject);
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

    for(var i = 0; i < eventKeys.length; i++) {
      processEvent(eventKeys[i]);
    }


}



async function deleteAllDataAtEndpoint(endpoint) {
    var ref = db.ref(`/${endpoint}/`);
    ref.set(null)
}

processAllEventsInYear(2020);
