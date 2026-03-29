import clsx from 'clsx';
import Star from './assets/star.svg?react';

function starNumber(value: number) {
  return (Math.round(value * 8)) / 2;
}

interface StarDisplayProps {
  baseStars: number;
  equipStars: number;
  boonStars: number;
}

function StarDisplay({ baseStars, equipStars, boonStars }: StarDisplayProps) {
  const boonIsNegative = boonStars < 0;

  const roundedBase = starNumber(baseStars);
  const roundedBaseEquip = starNumber(baseStars + equipStars);
  const roundedTotal = starNumber(baseStars + equipStars + boonStars);

  let finalBase: number;
  let finalEquip: number;
  let finalBoon: number;

  if (boonIsNegative) {
    finalBase = Math.min(roundedBase, roundedTotal);
    finalEquip = roundedTotal - finalBase;
    finalBoon = roundedBaseEquip - roundedTotal;
  } else {
    finalBase = Math.min(roundedBase, roundedBaseEquip);
    finalEquip = roundedBaseEquip - finalBase;
    finalBoon = roundedTotal - roundedBaseEquip;
  }

  const baseWhole = Math.floor(finalBase);
  const baseHasHalf = finalBase % 1 !== 0;

  const effectiveEquip = (baseHasHalf && finalEquip > 0) ? finalEquip - 0.5 : finalEquip;
  const equipWhole = Math.floor(effectiveEquip);
  const equipHasHalf = effectiveEquip % 1 !== 0;

  const preBoonTrailing = finalEquip > 0 ? equipHasHalf : baseHasHalf;

  const effectiveBoon = (preBoonTrailing && finalBoon > 0) ? finalBoon - 0.5 : finalBoon;
  const boonWhole = Math.floor(effectiveBoon);
  const boonHasHalf = effectiveBoon % 1 !== 0;


  const equipClass = clsx('star', 'equip-star');
  const boonClass = clsx('star', boonIsNegative ? 'penalty-star' : 'bonus-star');

  return (
    <div className='star-row'>
      {Array.from({ length: baseWhole }, (_, i) => (
        <Star key={`base-${i}`} className='star' />
      ))}
      {baseHasHalf && <Star className='star' id='left-half-star' />}

      {baseHasHalf && finalEquip > 0 && <Star className={equipClass} id='right-half-star' />}
      {Array.from({ length: equipWhole }, (_, i) => (
        <Star key={`equip-${i}`} className={equipClass} />
      ))}
      {equipHasHalf && <Star className={equipClass} id='left-half-star' />}

      {preBoonTrailing && finalBoon > 0 && <Star className={boonClass} id='right-half-star' />}
      {Array.from({ length: boonWhole }, (_, i) => (
        <Star key={`boon-${i}`} className={boonClass} />
      ))}
      {boonHasHalf && <Star className={boonClass} id='left-half-star' />}
    </div>
  );
}

export default StarDisplay;