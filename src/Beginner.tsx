import Markdown from 'react-markdown'
import beginnersguide from './posts/beginnersguide.md?raw'
import './Gazette/Gazette.css'

function Beginner() {
  return(
    <div className='shadow-container'>
    <div className='paper' style={{maxWidth: "500px"}}>
    <div className='feature'>
    <div className='article' id='one-col'>
      <Markdown>{beginnersguide}</Markdown>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Beginner