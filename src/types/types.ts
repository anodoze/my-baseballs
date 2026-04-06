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

export interface AttributeBreakdown {
  total: number
  baseValue: number
  boonBonus: number
  equipBonus: number
  augmentBonus: number
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
  bats: string
  throws: string
  home: string
  likes: string
  dislikes: string
  firstName: string
  lastName: string
  suffix: string | null
  number: number
  level: number
  position: string
  positionType: string
  priority: number
  pitchTypes?: string[]
  pitchSelection?: number[]
  equipment: Record<string, Equipment>
  foodBuffs: {
    name: string
    emoji: string
    attribute: string
    applied_at: string
    instance_id: string
  }[]
  lesserBoon: Boon[]
  modifications: unknown[]
  augmentHistory: {
    amount: number
    attribute: string
    timestamp: string
    augment_name: string
  }[]
  appliedLevelUps: LevelUp[]
  pendingLevelUps: LevelUp[]
  scheduledLevelUps: LevelUp[]
  baseAttributeBonuses: {
    amount: number
    attribute: string
    source: string
  }[]
  attributeBreakdown: Record<string, AttributeBreakdown>
  seasonStats: Record<string, Record<string, string>>
}

export type PlayerStats = Record<string, number | string | null>
