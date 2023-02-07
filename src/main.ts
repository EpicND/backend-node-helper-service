import savedMatches from "./savedMatches.json";
import savedTeams from "./savedTeams.json";
import Team from "./TeamClass";

class Match {
  teams: {
    blue: Team[];
    red: Team[];
  };
  eventTeams: { [key: number]: Team };
  constructor(teams?: { blue: Team[]; red: Team[] }) {
    this.teams = teams;
  }
}

/**
 * Pulls and holds all the data for an event
 */
class Event {
  public eventKey: string;
  private teams: { [key: number]: Team };
  private matches: Match[];

  constructor(eventKey: string) {
    this.eventKey = eventKey;
    this.matches = [];
    this.teams = {};
  }

  // Pull team data from 'The Blue Alliance' API
  loadTeams() {
    // : Promise<void>
    // TODO: Actually pull the data from the API

    for (var team in savedTeams) {
      var currTeam = savedTeams[team].team_number;
      this.teams[currTeam] = new Team(currTeam);
    }

    return;
  }

  // Pull match data from 'The Blue Alliance' API
  loadMatches(): Promise<void> {
    // TODO: Actually pull the data from the API

    for (var match in savedMatches) {
      var blueTeams: Team[] = [];
      var redTeams: Team[] = [];

      var currentMatch = savedMatches[match].alliances;
      for (var blueTeam in currentMatch.blue.team_keys) {
        blueTeams.push(
          new Team(parseInt(currentMatch.blue.team_keys[blueTeam].substring(3)))
        );
        console.log(blueTeams);
      }

      for (var redTeam in currentMatch.red.team_keys) {
        redTeams.push(
          new Team(parseInt(currentMatch.red.team_keys[redTeam].substring(3)))
        );
      }

      this.matches.push(new Match({ red: redTeams, blue: blueTeams }));
    }
    return;
  }

  showMatches() {
    console.log(this.matches);
  }
}

var random: Event = new Event("2022mndu");
random.loadMatches();
random.showMatches();
