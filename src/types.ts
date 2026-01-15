export interface PlayerStats {
  [key: string]: number;
}

export interface Boon {
  Description: string;
  Emoji: string;
  Name: string;
}

export interface Equipment {
  Cost?: number;
  Durability?: number;
  Effects: Array<{
    Attribute: string;
    Tier?: number;
    Type: string;
    Value: number;
  }>;
  Emoji: string;
  Name: string;
  PrefixPositionType?: string;
  Prefixes?: string[];
  RareName?: string;
  Rarity?: string;
  Slot: string;
  Specialized?: boolean;
  Suffixes?: string[];
}

export interface StarAttribute {
  attribute: string;
  base_display: string;
  base_regular: number;
  base_shiny: number;
  base_stars: number;
  base_total: number;
  display: string;
  regular: number;
  shiny: number;
  stars: number;
  total: number;
}

export interface Talk {
  attributes: { [key: string]: number };
  day: number | string;
  season: number;
  stars: { [key: string]: StarAttribute };
}

export interface Player {
  Augments: number;
  Bats: string;
  Birthday: number;
  Birthseason: number;
  Dislikes: string;
  Durability: number;
  Equipment: {
    Accessory?: Equipment;
    Body?: Equipment;
    Feet?: Equipment;
    Hands?: Equipment;
    Head?: Equipment;
  };
  FirstName: string;
  Home: string;
  LastName: string;
  Likes: string;
  Modifications: any[];
  Number: number;
  PitchSelection: number[];
  PitchTypes: string[];
  Position: string;
  PositionType: "Batter" | "Pitcher";
  SeasonStats: { [seasonId: string]: { [recordType: string]: string } };
  Stats: { [teamId: string]: PlayerStats }; // keyed but empty now
  Talk: {
    Baserunning: Talk;
    Batting: Talk;
    Defense: Talk;
    Pitching: Talk;
  };
  AttributeStars: {
    Baserunning: AttributeStarsCategory;
    Batting: AttributeStarsCategory;
    Defense: AttributeStarsCategory;
    Pitching: AttributeStarsCategory;
  };
  AugmentHistory: any[];
  BaseAttributes: { [key: string]: number | number[] | string[] };
  FoodBuffs: FoodBuff[];
  GreaterBoon: Boon[] | null;  // Changed from single to array
  LesserBoon: Boon[] | null;   // Changed from single to array
  Level: number;
  PendingLevelUps: any[];
  PitchCategoryBonuses: { [key: string]: any };
  PitchTypeBonuses: { [key: string]: any };
  ScheduledLevelUps: LevelUp[];
  Suffix: string | null;
  XP: number;
  TeamID: string;
  Throws: string;
  _id: string;
}

interface FoodBuff {
  applied_at: string;
  attribute: string;
  emoji: string;
  instance_id: string;
  name: string;
}

interface LevelUp {
  applied_at: string;
  choice: {
    amount: number;
    attribute: string;
    id: string;
    label: string;
    type: string;
  };
  effective_at: string;
  id: string;
  level: number;
}

interface AttributeStarsCategory {
  [attribute: string]: StarAttribute;
}

export interface PlayerShort {
  BenchIndex: number | null;
  BenchRole: string | null;
  Emoji: string;
  FirstName: string;
  GreaterBoon: Boon | null;
  LastName: string;
  LesserBoon: Boon | null;
  Modifications: any[];
  Number: number;
  PlayerID: string;
  Position: string;
  PositionType: "Batter" | "Pitcher";
  Slot: string;
  SlotLabel: string;
  SlotType: string;
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
  Players: PlayerShort[];
  Bench: {
    Batters: PlayerShort[];
    Pitchers: PlayerShort[];
  }
  Record: TeamRecord;
  SeasonRecords: {
    [key: string]: string
  };
  _id: string;
}