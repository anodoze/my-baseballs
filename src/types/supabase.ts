export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      leagues: {
        Row: {
          color: string | null
          emoji: string | null
          id: string
          league_type: string | null
          name: string
        }
        Insert: {
          color?: string | null
          emoji?: string | null
          id: string
          league_type?: string | null
          name: string
        }
        Update: {
          color?: string | null
          emoji?: string | null
          id?: string
          league_type?: string | null
          name?: string
        }
        Relationships: []
      }
      player_attributes: {
        Row: {
          accuracy: number | null
          acrobatics: number | null
          agility: number | null
          aiming: number | null
          arm: number | null
          awareness: number | null
          composure: number | null
          contact: number | null
          control: number | null
          cunning: number | null
          deception: number | null
          defiance: number | null
          determination: number | null
          dexterity: number | null
          discipline: number | null
          greed: number | null
          guts: number | null
          insight: number | null
          intimidation: number | null
          intuition: number | null
          lift: number | null
          luck: number | null
          muscle: number | null
          patience: number | null
          performance: number | null
          persuasion: number | null
          player_id: string
          presence: number | null
          reaction: number | null
          rotation: number | null
          selflessness: number | null
          speed: number | null
          stamina: number | null
          stealth: number | null
          stuff: number | null
          velocity: number | null
          vision: number | null
          wisdom: number | null
        }
        Insert: {
          accuracy?: number | null
          acrobatics?: number | null
          agility?: number | null
          aiming?: number | null
          arm?: number | null
          awareness?: number | null
          composure?: number | null
          contact?: number | null
          control?: number | null
          cunning?: number | null
          deception?: number | null
          defiance?: number | null
          determination?: number | null
          dexterity?: number | null
          discipline?: number | null
          greed?: number | null
          guts?: number | null
          insight?: number | null
          intimidation?: number | null
          intuition?: number | null
          lift?: number | null
          luck?: number | null
          muscle?: number | null
          patience?: number | null
          performance?: number | null
          persuasion?: number | null
          player_id: string
          presence?: number | null
          reaction?: number | null
          rotation?: number | null
          selflessness?: number | null
          speed?: number | null
          stamina?: number | null
          stealth?: number | null
          stuff?: number | null
          velocity?: number | null
          vision?: number | null
          wisdom?: number | null
        }
        Update: {
          accuracy?: number | null
          acrobatics?: number | null
          agility?: number | null
          aiming?: number | null
          arm?: number | null
          awareness?: number | null
          composure?: number | null
          contact?: number | null
          control?: number | null
          cunning?: number | null
          deception?: number | null
          defiance?: number | null
          determination?: number | null
          dexterity?: number | null
          discipline?: number | null
          greed?: number | null
          guts?: number | null
          insight?: number | null
          intimidation?: number | null
          intuition?: number | null
          lift?: number | null
          luck?: number | null
          muscle?: number | null
          patience?: number | null
          performance?: number | null
          persuasion?: number | null
          player_id?: string
          presence?: number | null
          reaction?: number | null
          rotation?: number | null
          selflessness?: number | null
          speed?: number | null
          stamina?: number | null
          stealth?: number | null
          stuff?: number | null
          velocity?: number | null
          vision?: number | null
          wisdom?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_attributes_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_details: {
        Row: {
          details: Json | null
          last_updated: string | null
          player_id: string
        }
        Insert: {
          details?: Json | null
          last_updated?: string | null
          player_id: string
        }
        Update: {
          details?: Json | null
          last_updated?: string | null
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_details_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats: {
        Row: {
          allowed_stolen_bases: number | null
          appearances: number | null
          assists: number | null
          at_bats: number | null
          ba: number | null
          babip: number | null
          batters_faced: number | null
          bb9: number | null
          caught_stealing: number | null
          complete_games: number | null
          double_plays: number | null
          doubles: number | null
          earned_runs: number | null
          era: number | null
          errors: number | null
          force_outs: number | null
          games_finished: number | null
          grounded_into_double_play: number | null
          h9: number | null
          hit_batters: number | null
          hit_by_pitch: number | null
          hits: number | null
          hits_allowed: number | null
          holds: number | null
          home_runs: number | null
          home_runs_allowed: number | null
          hr9: number | null
          inherited_runners: number | null
          inherited_runs_allowed: number | null
          innings_pitched: number | null
          k9: number | null
          last_updated: string | null
          left_on_base: number | null
          losses: number | null
          mound_visits: number | null
          no_hitters: number | null
          obp: number | null
          ops: number | null
          outs: number | null
          pitches_thrown: number | null
          plate_appearances: number | null
          player_id: string
          putouts: number | null
          quality_starts: number | null
          rcs_pct: number | null
          reached_on_error: number | null
          runners_caught_stealing: number | null
          runs: number | null
          runs_batted_in: number | null
          sac_flies: number | null
          saves: number | null
          shutouts: number | null
          singles: number | null
          slg: number | null
          starts: number | null
          stolen_bases: number | null
          strikeouts: number | null
          struck_out: number | null
          triples: number | null
          walked: number | null
          walks: number | null
          whip: number | null
          wins: number | null
        }
        Insert: {
          allowed_stolen_bases?: number | null
          appearances?: number | null
          assists?: number | null
          at_bats?: number | null
          ba?: number | null
          babip?: number | null
          batters_faced?: number | null
          bb9?: number | null
          caught_stealing?: number | null
          complete_games?: number | null
          double_plays?: number | null
          doubles?: number | null
          earned_runs?: number | null
          era?: number | null
          errors?: number | null
          force_outs?: number | null
          games_finished?: number | null
          grounded_into_double_play?: number | null
          h9?: number | null
          hit_batters?: number | null
          hit_by_pitch?: number | null
          hits?: number | null
          hits_allowed?: number | null
          holds?: number | null
          home_runs?: number | null
          home_runs_allowed?: number | null
          hr9?: number | null
          inherited_runners?: number | null
          inherited_runs_allowed?: number | null
          innings_pitched?: number | null
          k9?: number | null
          last_updated?: string | null
          left_on_base?: number | null
          losses?: number | null
          mound_visits?: number | null
          no_hitters?: number | null
          obp?: number | null
          ops?: number | null
          outs?: number | null
          pitches_thrown?: number | null
          plate_appearances?: number | null
          player_id: string
          putouts?: number | null
          quality_starts?: number | null
          rcs_pct?: number | null
          reached_on_error?: number | null
          runners_caught_stealing?: number | null
          runs?: number | null
          runs_batted_in?: number | null
          sac_flies?: number | null
          saves?: number | null
          shutouts?: number | null
          singles?: number | null
          slg?: number | null
          starts?: number | null
          stolen_bases?: number | null
          strikeouts?: number | null
          struck_out?: number | null
          triples?: number | null
          walked?: number | null
          walks?: number | null
          whip?: number | null
          wins?: number | null
        }
        Update: {
          allowed_stolen_bases?: number | null
          appearances?: number | null
          assists?: number | null
          at_bats?: number | null
          ba?: number | null
          babip?: number | null
          batters_faced?: number | null
          bb9?: number | null
          caught_stealing?: number | null
          complete_games?: number | null
          double_plays?: number | null
          doubles?: number | null
          earned_runs?: number | null
          era?: number | null
          errors?: number | null
          force_outs?: number | null
          games_finished?: number | null
          grounded_into_double_play?: number | null
          h9?: number | null
          hit_batters?: number | null
          hit_by_pitch?: number | null
          hits?: number | null
          hits_allowed?: number | null
          holds?: number | null
          home_runs?: number | null
          home_runs_allowed?: number | null
          hr9?: number | null
          inherited_runners?: number | null
          inherited_runs_allowed?: number | null
          innings_pitched?: number | null
          k9?: number | null
          last_updated?: string | null
          left_on_base?: number | null
          losses?: number | null
          mound_visits?: number | null
          no_hitters?: number | null
          obp?: number | null
          ops?: number | null
          outs?: number | null
          pitches_thrown?: number | null
          plate_appearances?: number | null
          player_id?: string
          putouts?: number | null
          quality_starts?: number | null
          rcs_pct?: number | null
          reached_on_error?: number | null
          runners_caught_stealing?: number | null
          runs?: number | null
          runs_batted_in?: number | null
          sac_flies?: number | null
          saves?: number | null
          shutouts?: number | null
          singles?: number | null
          slg?: number | null
          starts?: number | null
          stolen_bases?: number | null
          strikeouts?: number | null
          struck_out?: number | null
          triples?: number | null
          walked?: number | null
          walks?: number | null
          whip?: number | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
          last_updated: string | null
          level: number | null
          number: number | null
          position: string | null
          position_type: string | null
          slot: string | null
          suffix: string | null
          team_id: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
          last_updated?: string | null
          level?: number | null
          number?: number | null
          position?: string | null
          position_type?: string | null
          slot?: string | null
          suffix?: string | null
          team_id?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_updated?: string | null
          level?: number | null
          number?: number | null
          position?: string | null
          position_type?: string | null
          slot?: string | null
          suffix?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      scrape_runs: {
        Row: {
          errors: number | null
          finished_at: string | null
          id: number
          notes: string | null
          started_at: string | null
          teams_scraped: number | null
        }
        Insert: {
          errors?: number | null
          finished_at?: string | null
          id?: number
          notes?: string | null
          started_at?: string | null
          teams_scraped?: number | null
        }
        Update: {
          errors?: number | null
          finished_at?: string | null
          id?: number
          notes?: string | null
          started_at?: string | null
          teams_scraped?: number | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          color: string | null
          emoji: string | null
          id: string
          last_updated: string | null
          league_id: string | null
          location: string | null
          losses: number | null
          name: string
          rundiff: number | null
          wins: number | null
        }
        Insert: {
          color?: string | null
          emoji?: string | null
          id: string
          last_updated?: string | null
          league_id?: string | null
          location?: string | null
          losses?: number | null
          name: string
          rundiff?: number | null
          wins?: number | null
        }
        Update: {
          color?: string | null
          emoji?: string | null
          id?: string
          last_updated?: string | null
          league_id?: string | null
          location?: string | null
          losses?: number | null
          name?: string
          rundiff?: number | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      mv_batting_leaderboard: {
        Row: {
          first_name: string | null
          last_name: string | null
          league_id: string | null
          league_name: string | null
          league_type: string | null
          pa_threshold: number | null
          plate_appearances: number | null
          player_id: string | null
          position: string | null
          rank_in_league: number | null
          stat_key: string | null
          stat_value: number | null
          team_id: string | null
          team_name: string | null
        }
        Relationships: []
      }
      mv_games_played: {
        Row: {
          games_played: number | null
          league_type: string | null
        }
        Relationships: []
      }
      mv_league_batting_context: {
        Row: {
          avg_ba: number | null
          avg_babip: number | null
          avg_obp: number | null
          avg_ops: number | null
          avg_slg: number | null
          league_id: string | null
          league_name: string | null
          league_type: string | null
          qualified_batters: number | null
          sum_1b: number | null
          sum_2b: number | null
          sum_3b: number | null
          sum_ab: number | null
          sum_bb: number | null
          sum_h: number | null
          sum_hbp: number | null
          sum_hr: number | null
          sum_k: number | null
          sum_sf: number | null
        }
        Relationships: []
      }
      mv_league_pitching_context: {
        Row: {
          avg_bb9: number | null
          avg_era: number | null
          avg_h9: number | null
          avg_hr9: number | null
          avg_k9: number | null
          avg_whip: number | null
          fip_constant: number | null
          league_id: string | null
          league_name: string | null
          league_type: string | null
          qualified_pitchers: number | null
          sum_bb: number | null
          sum_er: number | null
          sum_h: number | null
          sum_hr: number | null
          sum_ip: number | null
          sum_k: number | null
        }
        Relationships: []
      }
      mv_pitching_leaderboard: {
        Row: {
          first_name: string | null
          innings_pitched: number | null
          ip_threshold: number | null
          last_name: string | null
          league_id: string | null
          league_name: string | null
          league_type: string | null
          player_id: string | null
          position: string | null
          rank_in_league: number | null
          stat_key: string | null
          stat_value: number | null
          team_id: string | null
          team_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
