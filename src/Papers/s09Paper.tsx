import Markdown from 'react-markdown'
import s09_Intro from '../posts/s09_Intro.md?raw'
import s09_Top3 from '../posts/s09_Top3.md?raw'
import s09_considerations from '../posts/s09_considerations.md?raw'
import Title from '../Gazette/Title'

function S09Paper(){
  return (
    <div className='paper'>
      <Title/>
      <h5>Season 9</h5>
      <div className='fold'>
        <div className='feature'>
          <h2>Season Nine Overview</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s09_Intro}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <h2>Callup Considerations</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s09_considerations}
            </Markdown>
          </div>
        </div>
      </div>
        <div className='feature_c'>
          <h2>Amphibian League Midseason Review</h2>
          <h1 style={{textAlign: "center"}}>𓆏𓆏𓆏𓆏𓆏𓆏𓆏𓆏</h1>
          <p>Caveats in mind, here's the main event! The Leaders of the Amphibian League!</p>
            <Markdown>
              {s09_Top3}
            </Markdown>
        </div>
      </div>
  )
}

export default S09Paper