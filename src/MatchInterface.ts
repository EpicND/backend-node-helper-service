declare module namespace {
  export interface Blue {
    dq_team_keys: any[];
    score: number;
    surrogate_team_keys: any[];
    team_keys: string[];
  }

  export interface Red {
    dq_team_keys: any[];
    score: number;
    surrogate_team_keys: any[];
    team_keys: string[];
  }

  export interface Alliances {
    blue: Blue;
    red: Red;
  }

  export interface Blue2 {
    adjustPoints: number;
    autoCargoLowerBlue: number;
    autoCargoLowerFar: number;
    autoCargoLowerNear: number;
    autoCargoLowerRed: number;
    autoCargoPoints: number;
    autoCargoTotal: number;
    autoCargoUpperBlue: number;
    autoCargoUpperFar: number;
    autoCargoUpperNear: number;
    autoCargoUpperRed: number;
    autoPoints: number;
    autoTaxiPoints: number;
    cargoBonusRankingPoint: boolean;
    endgamePoints: number;
    endgameRobot1: string;
    endgameRobot2: string;
    endgameRobot3: string;
    foulCount: number;
    foulPoints: number;
    hangarBonusRankingPoint: boolean;
    matchCargoTotal: number;
    quintetAchieved: boolean;
    rp: number;
    taxiRobot1: string;
    taxiRobot2: string;
    taxiRobot3: string;
    techFoulCount: number;
    teleopCargoLowerBlue: number;
    teleopCargoLowerFar: number;
    teleopCargoLowerNear: number;
    teleopCargoLowerRed: number;
    teleopCargoPoints: number;
    teleopCargoTotal: number;
    teleopCargoUpperBlue: number;
    teleopCargoUpperFar: number;
    teleopCargoUpperNear: number;
    teleopCargoUpperRed: number;
    teleopPoints: number;
    totalPoints: number;
  }

  export interface Red2 {
    adjustPoints: number;
    autoCargoLowerBlue: number;
    autoCargoLowerFar: number;
    autoCargoLowerNear: number;
    autoCargoLowerRed: number;
    autoCargoPoints: number;
    autoCargoTotal: number;
    autoCargoUpperBlue: number;
    autoCargoUpperFar: number;
    autoCargoUpperNear: number;
    autoCargoUpperRed: number;
    autoPoints: number;
    autoTaxiPoints: number;
    cargoBonusRankingPoint: boolean;
    endgamePoints: number;
    endgameRobot1: string;
    endgameRobot2: string;
    endgameRobot3: string;
    foulCount: number;
    foulPoints: number;
    hangarBonusRankingPoint: boolean;
    matchCargoTotal: number;
    quintetAchieved: boolean;
    rp: number;
    taxiRobot1: string;
    taxiRobot2: string;
    taxiRobot3: string;
    techFoulCount: number;
    teleopCargoLowerBlue: number;
    teleopCargoLowerFar: number;
    teleopCargoLowerNear: number;
    teleopCargoLowerRed: number;
    teleopCargoPoints: number;
    teleopCargoTotal: number;
    teleopCargoUpperBlue: number;
    teleopCargoUpperFar: number;
    teleopCargoUpperNear: number;
    teleopCargoUpperRed: number;
    teleopPoints: number;
    totalPoints: number;
  }

  export interface ScoreBreakdown {
    blue: Blue2;
    red: Red2;
  }

  export interface Video {
    key: string;
    type: string;
  }

  export interface RootObject {
    actual_time: number;
    alliances: Alliances;
    comp_level: string;
    event_key: string;
    key: string;
    match_number: number;
    post_result_time: number;
    predicted_time?: number;
    score_breakdown: ScoreBreakdown;
    set_number: number;
    time: number;
    videos: Video[];
    winning_alliance: string;
  }
}
