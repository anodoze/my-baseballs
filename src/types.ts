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

export interface BaseAttributeBonus {
  amount: number;
  attribute: string;
  source: string;
}

export interface FoodBuff {
  applied_at: string;
  attribute: string;
  emoji: string;
  instance_id: string;
  name: string;
}

export interface LevelUpChoice {
  amount?: number;
  attribute?: string;
  bonus?: number;
  category?: string;
  id: string;
  label: string;
  type: string;
  pitch_type?: string;
  new_pitch?: string;
  old_pitch?: string;
  boon?: Boon;
  description?: string;
  name?: string;
}

export interface ScheduledLevelUp {
  choice: LevelUpChoice;
  id: string;
  level: number;
  scheduled_at: string;
}

export interface PendingLevelUp {
  earned_at: string;
  id: string;
  level: number;
  options?: LevelUpChoice[];
}

export interface Player {
  AugmentHistory: any[];
  BaseAttributeBonuses: BaseAttributeBonus[];
  Bats: string;
  Birthday: number | string;
  Birthseason: number;
  Dislikes: string;
  Equipment: {
    Accessory?: Equipment;
    Body?: Equipment;
    Feet?: Equipment;
    Hands?: Equipment;
    Head?: Equipment;
  };
  FirstName: string;
  FoodBuffs: FoodBuff[];
  GreaterBoon: Boon[];
  GreaterDurability: number;
  Home: string;
  LastName: string;
  Legacy?: boolean;
  LesserBoon: Boon[];
  LesserDurability: number;
  Level: number;
  Likes: string;
  Modifications: any[];
  Number: number;
  PendingLevelUps: PendingLevelUp[];
  PitchSelection: number[];
  PitchTypes: string[];
  Position: string;
  PositionType: 'Batter' | 'Pitcher';
  Priority: number;
  ScheduledLevelUps: ScheduledLevelUp[];
  SeasonStats: Record<string, Record<string, string>>;
  Stats: Record<string, any>;
  Suffix: string | null;
  TeamID: string;
  Throws: string;
  _id: string;
}

export interface PlayerStats {
  [key: string]: number;
}

export interface PlayerShort {
  BenchIndex: number | null;
  BenchRole: string | null;
  Emoji: string;
  FirstName: string;
  FoodBuffs: FoodBuff[];
  FreeRecomp?: boolean;
  GreaterBoon: Boon[];
  LastName: string;
  LesserBoon: Boon[];
  Level: number;
  Modifications: any[];
  Number: number;
  PendingLevelUps: PendingLevelUp[];
  PlayerID: string;
  Position: string;
  PositionType: 'Batter' | 'Pitcher';
  Slot: string;
  SlotLabel: string;
  SlotType: string;
  Stats: PlayerStats;
  Suffix: string | null;
}

export interface SeasonRecord {
  Losses: number;
  RunDifferential: number;
  Wins: number;
}

export interface TeamRecord {
  'Regular Season': SeasonRecord;
  [key: string]: SeasonRecord | undefined;
}

export interface TeamData {
  Abbreviation?: string;
  BallparkName: string;
  BallparkUseCity: boolean;
  Championships: number;
  Color: string;
  Emoji: string;
  FullLocation?: string;
  League: string;
  Location: string;
  Modifications: any[];
  Name: string;
  Players: PlayerShort[];
  Bench: {
    Batters: PlayerShort[];
    Pitchers: PlayerShort[];
  };
  Record: TeamRecord;
  SeasonRecords?: Record<string, string>;
  _id: string;
}