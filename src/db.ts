import { createClient } from '@supabase/supabase-js'
import type { QueryData } from '@supabase/supabase-js'
import type { Database } from './types/supabase'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function fetchTeam(teamID: string){
  const { data, error } = await teamQuery(teamID)
  if (error) throw error
  return data
}

const teamQuery = (teamID: string) => supabase
  .from('teams')
  .select(`
    id, name, location, emoji, color,
    players (
      id, first_name, last_name, suffix, number, position, position_type, level, slot,
      player_stats (*),
      player_details (details)
    )
  `)
  .eq('id', teamID)
  .single()

export type TeamData = QueryData<ReturnType<typeof teamQuery>>