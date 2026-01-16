interface Stats {
  name: string;
  number: number;
}

function Statbox({name, number}: Stats){

  return(
    <div className="stat-box">
      <p id="stat-name">`${name}: `</p>
      <p id="stat-number">{number}</p>
    </div>
  )
}

export default Statbox;