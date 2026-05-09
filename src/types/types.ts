export interface ApiTeamData {
  _id: string
  Name: string
  Location: string
  Emoji: string
  Color: string
  Manager: string
  League: string
  Record: Record<string, { Wins: number; Losses: number; RunDifferential?: number }>
  Players: ApiTeamPlayer[]
  Bench: {
    Batters: ApiTeamPlayer[]
    Pitchers: ApiTeamPlayer[]
  }
  Modifications: unknown[]
  IsPlaying: boolean
  SwapAvailable: boolean
  LineupPriority: string
}

export interface ApiTeamPlayer {
  PlayerID: string
  Slot: string
  SlotLabel: string
  SlotType: string
  Position: string
  PositionType: string
  FirstName: string
  LastName: string
  Suffix: string | null
  Number: number
  Level: number
  LesserBoon: Boon[]
  FoodBuffs: FoodBuff[]
  Modifications: unknown[]
  PendingLevelUps: { id: string; level: number; earned_at: string }[]
  Stats: PlayerStats
}

export interface AttributeBreakdown {
  baseValue: number;  
  augmentBonus: number;
  equipBonus: number;
  boonBonus: number;
  total: number; 
}

export interface Boon {
  Description: string;
  Emoji: string;
  Name: string;
}

export interface Equipment {
  Cost?: number;
  Durability?: number;
  Effects: {
    Attribute: string;
    Tier?: number;
    Type: string;
    Value: number;
  }[]
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
  id: string
  type: 'attribute' | 'lesser_boon'
  label: string
  amount?: number
  attribute?: string
  boon?: Boon
  name?: string
  description?: string
}

export interface LevelUp {
  earned_at: string;
  id: string;
  level: number;
  choice: LevelUpChoice;
}

export interface Player {
  id: string
  first_name: string | null
  last_name: string | null
  suffix: string | null
  number: number | null
  position: string | null
  position_type: string | null
  level: number | null
  slot: string | null
  player_stats: PlayerStats | null
  player_details: { details: PlayerDetails} | null
}

export interface PlayerDetails {
  _id: string
  Bats: string
  Throws: string
  Home: string
  Likes: string
  Dislikes: string
  FirstName: string
  LastName: string
  Suffix: string | null
  Number: number
  Level: number
  Position: string
  PositionType: string
  Slot: string
  Priority: number
  PitchTypes?: string[]
  PitchSelection?: number[]
  Equipment: Record<string, Equipment>
  FoodBuffs: {
    name: string
    emoji: string
    attribute: string
    applied_at: string
    instance_id: string
  }[]
  LesserBoon: Boon[]
  Modifications: unknown[]
  AugmentHistory: {
    amount: number
    attribute: string
    timestamp: string
    augment_name: string
  }[]
  AppliedLevelUps: LevelUp[]
  PendingLevelUps: LevelUp[]
  ScheduledLevelUps: LevelUp[]
  BaseAttributeBonuses: {
    amount: number
    attribute: string
    source: string
  }[]
  GreaterDurability: number
  LesserDurability: number
  Stats: ApiPlayerStats
  SeasonStats: Record<string, Record<string, string>>
}

export type ApiPlayerStats = Record<string, Record<string, number>>

export type PlayerStats = Record<string, number | string | null>

export interface RecentTeam {
  id: string
  name: string
  location: string
  emoji: string
  color: string
}
