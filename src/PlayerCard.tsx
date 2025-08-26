function PlayerCard({player}) {

  const {
      name,
      position,
      number,
      bats,
      throws,
      likes,
      dislikes,
      scout_opinion,
      lineup_position,
      luck,
      batting,
      defense,
      pitching,
      baserunning
  } = player

  return (
    <div>
      <h2>{name}</h2>
      <div>
        bats: {bats}
        <br />
        throws: {throws}
      </div>
      <div>
        likes: {likes}
        <br/>
        dislikes: {dislikes}
      </div>
    </div>
  );
}

export default PlayerCard;