import './StarDisplay.css'
import Star from './assets/star.svg'

function starNumber (value: number) {
  return (Math.round(((value * 100)/25) * 2))/2
}

function StarDisplay ({stars}: {stars: number}) {
  
  const starDisplay = stars ? starNumber(stars) : 0;
  const fullStars = Math.floor(starDisplay);
  const hasHalfStar = starDisplay % 1 !== 0;

  return (
    <div className='star-row'>
      {Array.from({ length: fullStars }, (_, i) => (
        <div key={i} className='star'>
        <img src={Star} />
        </div>
      ))}
      {hasHalfStar && 
        <div key="half" className='left-half-star'>
        <img src={Star} />
        </div>
      }
    </div>
  )
}

export default StarDisplay;