import { languages } from "./Languages"
import { useState } from "react"
import clsx from 'clsx'
import getFarewellText, {randomword}  from "./Farewellmessages.jsx"
import Confetti from 'react-confetti'
function App() {
 
  const [currentword, setcurrentword] = useState(()=>  randomword())
  const [word , setword] = useState([])

  const Letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));



  const incorrectguesses = word.filter(letter => !currentword.includes(letter)).length
  console.log(incorrectguesses)
  const gamewon = currentword.every(letter => word.includes(letter));
  const gamelost = incorrectguesses >= languages.length-1;
  const gameover = gamewon|| gamelost;
  const Lastguessedletter = word[word.length-1];
  const Lastguessedletterincorrect =Lastguessedletter && !currentword.includes(Lastguessedletter)
console.log(Lastguessedletterincorrect)


  const lettersArray = Letters.map((letter)=> {
         const isGuessed = word.includes(letter);
         const isCorrect = isGuessed && currentword.includes(letter);
         const isWrong = isGuessed && !currentword.includes(letter);
         const classname = clsx( {
                correct:isCorrect,
                wrong:isWrong

         })
         return(
          <button key={letter} 
          onClick={()=> guessLetter(letter)} 
          className={classname}
          disabled= {gameover}
          aria-disabled= {word.includes(letter)}
          aria-label={`letter ${letter}`}
           >{letter.toUpperCase()} </button>
         )
  })
 
  function guessLetter (letter) {
           setword(prevletter =>
               prevletter.includes(letter) ? prevletter : [...prevletter, letter ] 
           )
           
  }   
  const gamestatusClass = clsx("gamestatus",{
    lost: gamelost,
    won: gamewon,
    farewellmessage :!gameover && Lastguessedletterincorrect
  })
  function rendergamestatus() {
    if(!gameover && Lastguessedletterincorrect) {
     
  return (
    <>
 <p>
  {getFarewellText(languages[incorrectguesses-1].name)}
 </p>
    </>
  )
    
        
     
     
      
    }

    if(gamewon) {
      return(
        <>
             <h2>You Win!</h2>
             <p>Well Done!🎉</p>
        </>
      )
    }
    if(gamelost) {
      return(
        <>   
            
            <h2>Game Over!</h2>
           <p>you lose! better start lerning Assembly.😭</p>
        </>
      )
    }
    return null
  }


  function cuword () {
  
setcurrentword(randomword());
    setword([]);
    console.log(currentword)
 
  }
 
   
 return (
 
    <main>
       {gamewon && <Confetti recycle={false} numberOfPieces={2000}/>}
      <header>
        <h1>Assembly: EndGame</h1>
        <p>Guess the word within 8 Attempts to keep 
          the programming world safe from Assemply!</p>
      </header>
      <section className={gamestatusClass}>
              {
                 rendergamestatus()
                
              }
      </section>
      <section className="language-select">
             {
              languages.map((language, index )=> {
                const prolost = index < incorrectguesses;
                const className = clsx('chip', prolost && 'chip-lost')
         
                const styles = {
                 backgroundColor: language.backgroundColor,
                 color: language.color
                }
              
                return (
                
                         <span style={styles }
                          className={ className}
                          >{language.name}</span>   
                       )})
             }
      </section>
      <section className="guess-word">
            {currentword.map((w,index) => {
              const revealword = gamelost || word.includes(w)
              return(
                <span key={index}>{revealword ? w.toUpperCase() : ''}</span>
              )
            })
            }
      </section>
      <section className="keyboard">
            {lettersArray}
      </section>
      <footer>
      { gameover && <button
         onClick={()=> cuword()}
      >New Game</button>}
       </footer>
    </main>
  )
}

export default App


