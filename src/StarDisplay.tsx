import './pips.css';

interface StarDisplayProps {
  baseStars: number;
  augmentStars: number;
  equipStars: number;
  boonStars: number;
  total: number;
}

function pipCount(value: number) {
  return Math.round(value * 10)
}

function StarDisplay({ baseStars, augmentStars, equipStars, boonStars, total }: StarDisplayProps) {
  const boonIsNegative = boonStars < 0

  const withoutBoon = total - boonStars
  const scale = withoutBoon !== 0 ? total / withoutBoon : 1

  const basePips    = pipCount(baseStars * (boonIsNegative ? scale : 1))
  const augmentPips = pipCount(augmentStars * (boonIsNegative ? scale : 1))
  const totalPips   = pipCount(total)
  const equipPips   = totalPips - basePips - augmentPips
  const boonPips    = pipCount(Math.abs(boonStars))

  const pips = [
    ...Array(basePips).fill('base'),
    ...Array(augmentPips).fill('augment'),
    ...(boonIsNegative
      ? Array(boonPips).fill('penalty')
      : Array(boonPips).fill('bonus')),
    ...Array(Math.max(0, equipPips)).fill('equip'),
  ]
  
  return (
    <div className='pip-row'>
      <div className='fake-pip'></div>
      {pips.map((type, i) => (
        <div key={i} className={`pip pip-${type}`} >.</div>
      ))}
    </div>
  )
}

export default StarDisplay;