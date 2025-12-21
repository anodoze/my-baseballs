import Markdown from 'react-markdown'
import s08_Intro from '../posts/s08_Intro.md?raw'
import s08_Top3 from '../posts/s08_Top3.md?raw'
import Title from '../Gazette/Title'

function S08Paper(){
  return (
    <div className='paper'>
      <Title/>
      <h5>Season 8</h5>
      <div className='fold'>
        <div className='feature_c'>
          <br></br>
          <h1 style={{textAlign: "center"}}>𓆏𓆏𓆏𓆏𓆏𓆏𓆏𓆏</h1>
        </div>
      </div>
      <div className='fold'>
        <div className='feature'>
          <h2>Season Eight Overview</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s08_Intro}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <h2>Amphibian League Midseason Review</h2>
          <p>A look at Tree Frog potential in the top of the Amphibian League</p>
          <div className='article'>
            <Markdown>
              {s08_Top3}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default S08Paper