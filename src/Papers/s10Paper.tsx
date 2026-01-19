import Markdown from 'react-markdown'
import s10_Intro from '../posts/s10_GL.md?raw'
import s10_Top3 from '../posts/s10_Top3.md?raw'
import s10_considerations from '../posts/s10_considerations.md?raw'
import Title from '../Gazette/Title'

function S10Paper(){
  return (
    <div className='paper'>
      <Title/>
      <h5>Season 10</h5>
      <div className='fold'>
        <div className='feature'>
          <h2>Season Ten Overview</h2>
          <div className='article' id='one-col'>
            <Markdown>
              {s10_Intro}
            </Markdown>
          </div>
        </div>
        <div className='feature_b'>
          <h2>Callup Considerations</h2>
          <div className='article' id='one-col'>
            <h1 style={{textAlign: "center"}}>𓆏𓆏𓆏𓆏𓆏𓆏𓆏𓆏</h1>
            <Markdown>
              {s10_considerations}
            </Markdown>
          </div>
        </div>
      </div>
        <div className='feature_c'>
          <h2>Amphibian League Midseason Review</h2>
          <p>And here's Amphibian's midseason top 3! Who might be the next Tree Frogs?</p>
            <Markdown>
              {s10_Top3}
            </Markdown>
        </div>
      </div>
  )
}

// function S10Paper(){
//   return (
//     <div className='paper'>
//       <Title/>
//       <h5>Season 10</h5>
//       <div className='fold'>
//         <div className='feature_c'>
//           <br></br>
//           <h1 style={{textAlign: "center"}}>𓆏𓆏𓆏𓆏𓆏𓆏𓆏𓆏</h1>
//         </div>
//       </div>
//       <div className='fold' id='one-col'>
//         <div className='feature'>
//           <h2>Season Ten Overview</h2>
//           <div className='article' id='one-col'>
//             <Markdown>
//               {s10_Intro}
//             </Markdown>
//           </div>
//         </div>
//         {/* <div className='feature'>
//           <div className='article' id='one-col'>
//             <Markdown>
//               {s10_considerations}
//             </Markdown>
//           </div>
//         </div> */}
//         <div className='feature_b'>
//           <h2>Amphibian League Midseason Review</h2>
//           <p>A look at Tree Frog potential in the top of the Amphibian League</p>
//           <div className='article'>
//             <Markdown>
//               {s10_Top3}
//             </Markdown>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default S10Paper