import Markdown from 'react-markdown'
import s06_Intro from '../posts/s06_Intro.md?raw'
import s06_Overview from '../posts/s06_Overview.md?raw'
import s06_GL from '../posts/s06_GL.md?raw'
import s06_Top3 from '../posts/s06_Top3.md?raw'
import s06_Boondoggle from '../posts/s06_Boondoggle.md?raw'
import s06_Coyote from '../posts/s06_Coyote.md?raw'
import UrrloksMostWanted from '../assets/UrrloksMostWanted.png'
import coyote from '../assets/coyote.png'
import breathing_organs from '../assets/breathing_organs.png'
import Title from '../Gazette/Title'


function S06Paper(){
  return (
    <div className='paper'>
      <Title/>
      <h5>Season 6</h5>
      <div className='fold'>
        <div className='fullWidth'>
          <div className='extralarge'>CORRUPTION!</div>
          <div className='article' id='one-col'>
            <Markdown>
              {s06_Intro}
            </Markdown>
          </div>
        </div>
      </div>
      <div className='fold'>
        <div className='feature_c'>
          <div className='halftone-edge'>
            <div className='halftone-dots'>
              <img src={UrrloksMostWanted} />
            </div>
          </div>
            <h1>Corruption Report</h1>
            <h4>Spacey, Manager of Carefree Silly Little Ducks and Proud Parent to Tree Frog Theresa Ryan</h4>
            <p>
              This is Corruption Reporter Spacey coming to you live with an update from Commissioner Urrlok. Corrupted players in the Amphibian League have begun spreading Corruption to their fellow players, with the worst offenders pictured in the latest Urrlok’s Most Wanted report. 
              <br/><br/>
              The most recent update from our epidemiologists indicates that there are currently 43 active Corrupted players in the league spread across 18 different teams, with teams below .500 being especially impacted. With an uptick in Corrupted players and teams, the rate of spread is expected to rise exponentially if no further precautions are taken. Commissioner Urrlok urges teams to protect themselves and others from the Corruption by increasing players’ Luck and prioritizing Purifying or Recomposing Corrupted players as soon as possible. 
              <br/><br/>
              To encourage Purification, the League has instituted a new incentive program that rewards teams with a generous deposit of tokens upon Purification of Corrupted players.
              <br/><br/>
              Finally, the Commissioner would like to extend a special thank you to the Axotlán Axiomatic Axolotls and the Pyongyang Winners for Purifying all of their Corrupted players and maintaining the safety of the Amphibian League as a whole. That’s it for this Superstar Break’s Corruption Report!
            </p>
            <img src={breathing_organs} style={{ width: '80%' }}/>
        </div>
      </div>
      <div className='fold'>
        <div className='feature'>
          <h2>Anyway, Let's Talk Baseball</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s06_Overview}
            </Markdown>
            <Markdown>
              {s06_GL}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <h1>Amphibian League Midseason Review</h1>
          <h4>Who might be the next Atlanta Tree Frog?</h4>
          <div className='article'>
            <Markdown>
              {s06_Top3}
            </Markdown>
          </div>
        </div>
      </div>
      <div className='fold'>
        <div className='feature'>
          <h1>The Boondoggler</h1>
          <h4>Schazer's Guide to Boons</h4>
          <div className='article'>
            <Markdown>
              {s06_Boondoggle}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <div className='article' id='one-col'>
            <Markdown>
            {s06_Coyote}
            </Markdown>
          <div className='halftone-edge'>
            <div className='halftone-dots'>
              <img src={coyote} />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default S06Paper