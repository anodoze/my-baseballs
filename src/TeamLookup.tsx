import { useState } from 'react';
import { useNavigate } from 'react-router';

function TeamLookup() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const trimmed = input.trim();
    const id = trimmed.includes('/') 
      ? trimmed.split('/').pop() 
      : trimmed;
    if (id) navigate(`/team/${id}`);
  };

  return (
    <div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        placeholder="Team URL or teamID"
      />
      <button onClick={handleSubmit}>Go</button>
    </div>
  );
}

export default TeamLookup;