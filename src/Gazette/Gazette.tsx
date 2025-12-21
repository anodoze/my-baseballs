import './Gazette.css'
import S05Paper from '../Papers/s05Paper'
import S06Paper from '../Papers/s06Paper'
import S07Paper from '../Papers/s07Paper'
import S08Paper from '../Papers/s08Paper'
import S09Paper from '../Papers/s09Paper'

function Gazette(){
  return (
    <div className='shadow-container'>
      <S09Paper/>
      <div>
        <p>---</p>
        <p>---</p>
        <p>---</p>
      </div>      
      <S08Paper/>
      <div>
        <p>---</p>
        <p>---</p>
        <p>---</p>
      </div>
      <S07Paper/>
      <div>
        <p>---</p>
        <p>---</p>
        <p>---</p>
      </div>
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