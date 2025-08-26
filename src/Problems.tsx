// // import PlayerCard from "./PlayerCard";
// import { useState, useEffect } from "react";
// import type { TeamData, Player } from "./types";

// function Problems() {
//   const [teamData, setTeamData] = useState<TeamData | null>(null)
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('http://localhost:3001/api/team/6806d81fee9f269dec724b8a', {
//       headers: {
//         'Accept': 'application/json'
//       }
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('Failed to fetch team data.');
//       return res.json();
//     })
//     .then(data => {
//       setTeamData(data);
//     })
//     .catch(err => {
//       setError(err.message);
//     });
//   }, []);

// if (!teamData) return <div>{error}</div>

//   return (
//     <>
//       <h1>{teamData.Location} {teamData.Name}</h1>
//       {/* <PlayerCard player={player_list.players[0]} /> */}
//     </>
//   )
// }

// export default Problems;