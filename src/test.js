
for (var u = 0; u < 10; ++u) {
   this["marker"+u] = "add here" + u;
   console.log(this["marker" + u]);
}



var processedEventObject = new Object;
var counter;

async function processEvent(eventKey) {
   var eventTeams = await getTeams(eventKey);
   for(let i=0; i < eventTeams.length; i++) {
      dummy(eventTeams[i], eventKey);  
   }
   setTimeout(check(eventTeams.length), 100);
}

function check() {
   if()
}

async function dummy(eventTeam, eventKey) {
   processedEventObject[eventTeam.substring(3)] = await processTeamAtEvent(eventTeam, eventKey);
   counter++;
}
