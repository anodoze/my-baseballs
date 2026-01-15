import './StarDisplay.css'
import clsx from 'clsx';
import Star from './assets/star.svg?react'

function starNumber (value: number) {
  const starnum = (Math.round(value * 8))/2 
  console.log("starnum", starnum)
  return starnum
}

interface StarDisplayProps {
  baseStars: number;
  totalStars: number;
}

function StarDisplay ({baseStars, totalStars}: StarDisplayProps) {

  console.log("baseStars:", baseStars, "totalStars:", totalStars)

  const diff = totalStars - baseStars;
  const diffIsNegative = diff < 0;
  const base = diffIsNegative 
    ? starNumber(baseStars + diff) 
    : starNumber(baseStars);

  console.log("diff:", diff, "base:", base)
  
  const baseDisplay = Math.floor(base);
  const baseHasHalf = base % 1 !== 0;
  
  const diffDisplay = Math.floor(starNumber(Math.abs(diff)));
  const diffHasHalf = (Math.abs(diff) % 1 !== 0) 

  const total = starNumber(totalStars);
  const displayTotal = baseDisplay + diffDisplay
  const totalMatch = total == displayTotal


  const starClass = clsx('star', {
    'bonus-star': !diffIsNegative,
    'penalty-star': diffIsNegative,
  });

  const baseStarRow = Array.from({ length: baseDisplay }, (_, i) => (
        <Star key={`base-${i}`} className='star'/>
      ))

  return (
    <div className='star-row'>
      {baseStarRow}
      {baseHasHalf && ( <Star className='star' id='left-half-star'/> )}
      
      {diffHasHalf && baseHasHalf && (
          <Star className={starClass} id="right-half-star"/>
      )}
      {Array.from({ length: diffDisplay }, (_, i) => (
          <Star key={`diff-${i}`} className={starClass}/>
      ))}
      {diffHasHalf && !baseHasHalf && totalMatch && (
          <Star className={starClass} id="left-half-star"/>
      )}
    </div>
  )
}

export default StarDisplay;