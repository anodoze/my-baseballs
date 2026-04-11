import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { RecentTeam } from './types/types';

function TeamLookup() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

   document.title = "Team Selector"

  const handleSubmit = () => {
    const trimmed = input.trim();
    const id = trimmed.includes('/') 
      ? trimmed.split('/').pop() 
      : trimmed;
    if (id) navigate(`/team/${id}`);
  };

  const [recentTeams] = useState<RecentTeam[]>(() =>
    JSON.parse(localStorage.getItem('recentTeams') ?? '[]')
  )

  const recentTeamsList = recentTeams.map(team => (
    <button
      key={team.id}
      style={{ borderColor: team.color, width: "80%" }}
      onClick={() => navigate(`/team/${team.id}`)}
    >
      {team.emoji} {team.location} {team.name}
    </button>
  ))

  return (
    <div className='team-picker'>
      To look up a team, paste the teamID or the URL from the team page.
      <div className='team-picker-nest'>
        <input 
          className='team-selector'
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Team URL or teamID"
          />
        <button onClick={handleSubmit}>Go</button>
      </div>
      <div>
        <h3>Recent Teams Visited:</h3>
        {recentTeamsList}
      </div>
    </div>
  );
}

export default TeamLookup;