import Markdown from 'react-markdown'
import frog2frog from './assets/Communication-between-two-frogs.png'
import s05_Intro from './posts/s05_Intro.md?raw'
import s05_GL from './posts/s05_GL.md?raw'
import s05_Top3 from './posts/s05_Top3.md?raw'
import s05_Antics from './posts/s05_Antics.md?raw'
import './Gazette.css'

function Gazette(){
  return (
    <div className='shadow-container'>
    <div className='paper'>
        <div className='title'>
          <div className='frame'>
            <text>The Official Unofficial Periodical of the Amphibian League</text>
          </div>
          <h1>The Wet Gazette</h1>
          <div className='frame'>
            <text>Brought to you by chickadee and the No Tuesday Problems</text>
          </div>
        </div>
      <div className='topFold'>
        <div className='feature'>
          <img src={frog2frog}/>
          <h2>Season Five Overview</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s05_Intro}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <h2>It's Time to Talk About Pitching</h2>
          <div className='article'>
            <Markdown>
              {s05_GL}
            </Markdown>
          </div>
        </div>
      </div>
      <div className='bottomFold'>
        <div className='feature'>
          <h2>Amphibian League Midseason Review</h2>
          <p>A look at Tree Frog potential in the top of the Amphibian League</p>
          <div className='article'>
            <Markdown>
              {s05_Top3}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <h2>Amphibian Antics</h2>
          <p>Stories from around the league</p>
          <div className='article' id='one-col'>
            <Markdown>
              {s05_Antics}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Gazette