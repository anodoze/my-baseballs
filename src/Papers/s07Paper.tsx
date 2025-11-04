import Markdown from 'react-markdown'
import transform from '../assets/transform.png'
import s07_Intro from '../posts/s07_Intro.md?raw'
import s07_GL from '../posts/s07_GL.md?raw'
import s07_Top3 from '../posts/s07_Top3.md?raw'
import s07_newbie from '../posts/s07_newbie.md?raw'
import s07_OhNoOmari from '../posts/s07_OhNoOmari.md?raw'
import Title from '../Gazette/Title'

function S07Paper(){
  return (
    <div className='paper'>
      <Title/>
      <h5>Season 7</h5>
      <div className='fold'>
        <div className='feature'>
          <h2>Season Seven Overview</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s07_Intro}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <img src={transform}/>
          <h2>The De-Cline Continues</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s07_GL}
            </Markdown>
          </div>
        </div>
      </div>
      <div className='fold'>
        <div className='feature_c'>
          <h2>Amphibian League Midseason Review</h2>
            <Markdown>
              {s07_Top3}
            </Markdown>
        </div>
      </div>
      <div className='fold'>
        <div className='feature'>
          <div className='article'>
            <Markdown>
              {s07_newbie}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <div className='article' id='one-col'>
            <Markdown>
              {s07_OhNoOmari}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default S07Paper