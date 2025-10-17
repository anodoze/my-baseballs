function Byline({ name, team }: { name: string; team: string}){

  return (
    <div className="byline">
      {name}
      {team}
    </div>
  ) 
}

export default Byline