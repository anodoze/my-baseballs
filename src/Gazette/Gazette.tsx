import './Gazette.css'
import S05Paper from '../Papers/s05Paper'
import S06Paper from '../Papers/s06Paper'

function Gazette(){
  return (
    <div className='shadow-container'>
      <S06Paper/>
      <div>
        <p>---</p>
        <p>---</p>
        <p>---</p>
      </div>
      <S05Paper/>
    </div>
  )
}

export default Gazette