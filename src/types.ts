export interface PlayerStats {
  [key: string]: number;
}

export interface Player {
  Emoji: string;
  FirstName: string;
  LastName: string;
  Number: number;
  PlayerID: string;
  Position: string;
  PositionType: string;
  Slot: string;
  Stats: PlayerStats;
}

export interface SeasonRecord {
  Losses: number;
  RunDifferential: number;
  Wins: number;
}

export interface TeamRecord {
  Kumite: SeasonRecord;
  "Postseason Round 2": SeasonRecord;
  "Regular Season": SeasonRecord;
  [key: string]: SeasonRecord | undefined;
}

export interface TeamData {
  Abbreviation: string;
  BallparkName: string;
  BallparkUseCity: boolean;
  Championships: number;
  Color: string;
  Emoji: string;
  FullLocation:	string;
  League:	string;
  Location:	string;
  Modifications: any[];
  Name:	string;
  Players: Player[];
  Record: TeamRecord;
  SeasonRecords: {
    [key: string]: string
  };
  _id: string;
}