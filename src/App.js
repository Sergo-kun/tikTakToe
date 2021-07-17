import React, {useState} from 'react'
import cross from './img/Cross.png'
import circle from './img/Circle.png'
import './App.css';
import vertical from './img/Vertical.png'
import horizontal from './img/Gorisontall.png'
import oblique from './img/oblique.png'


function App(props) {
    const playerStyle = {
        color: 'white',
        listStyleType: 'none',
        position: 'relative',
        top: '200px',
        left: '40%'
    }
    const [message, setMessage] = useState('');
    const messageCall = event => {
        setMessage(event)
        setTimeout(() => {
                setMessage('')
            },3000)
    }
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [lineRed, setLineRed] = useState('');

    const [click, setClick] = useState(false);

    const textingOne = event => {
        setPlayer1(event.target.value)
    }
    const textingTwo = event => {
        setPlayer2(event.target.value)
    }

    const [state, setState] = useState({
        squares : Array(9).fill(null),

    })
    const [count, setCount] = useState(0)
    const winnerLine = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],

    ]



    const isWinner = () => {
        let wining = false
        let combination = []
        let s = (count % 2 === 0) ? cross : circle
        for (let i = 0; i < 8; i++) {
           let line = winnerLine[i]
           if (state.squares[line[0]] === s
               && state.squares[line[1]] === s
               && state.squares[line[2]] === s){
               for (let i = 0; i < 3; i++) {
                   combination.push(line[i])
               }

               if (combination.join() === [0,1,2].join()) {
                   setLineRed(<img className='zot' src={horizontal}/>)
               }else if (combination.join() === [3,4,5].join()) {
                   setLineRed(<img className='tff' src={horizontal}/>)
               }else if (combination.join() === [6,7,8].join()) {
                   setLineRed(<img className='sse' src={horizontal}/>)
               }else if (combination.join() === [0,3,6].join()) {
                   setLineRed(<img className='zts' src={vertical}/>)
               }else if (combination.join() === [1,4,7].join()) {
                   setLineRed(<img className='ofs' src={vertical}/>)
               }else if (combination.join() === [2,5,8].join()) {
                   setLineRed(<img className='tfe' src={vertical}/>)
               }else if (combination.join() === [0,4,8].join()) {
                   setLineRed(<img className='zfe' src={oblique}/>)
               }else if (combination.join() === [2,4,6].join()) {
                   setLineRed(<img className='tfs' src={oblique}/>)
               }
               wining = true
               {s === cross ? setScore1(score1+1) :  setScore2(score2+1)}
               {s === cross ?  messageCall(player1 + ' win!') :  messageCall(player2 + ' win!')}
               setTimeout(() => {
                   setCount(0)
                   setState({squares: Array(9).fill(null)})
                   setLineRed('')
               },3000)
           }
        }
        let nulls = 0
        for (let i = 0 ; i < 9; i++) {
            if (state.squares[i] !== null)
            nulls++
        }
        if (nulls === 9 && wining === false){
            setMessage('Draw')
            setTimeout(() => {
                setCount(0)
                setState({squares: Array(9).fill(null)})
               setMessage('')
            },3000)
        }

    }
    const clickHandler = event => {
        let data = event.target.getAttribute('data')
        let currentSquares = state.squares
        if (currentSquares[data] === null) {
            currentSquares[data] = (count % 2 === 0) ? cross : circle
            setCount(count + 1)
            setState({squares: currentSquares})
        }else {
            alert('Так нельзя!')
        }
        isWinner()
    }
  return (
      <>
          {player1 && player2 && click === true?
              <>
    <div className="App">
     <div className="itc-tac-toe">
         <div className='ttt-grid' onClick={clickHandler} data='0'>{state.squares[0] ?<img alt={'0'} className='figure' src={state.squares[0]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='1'>{state.squares[1] ?<img alt={'0'} className='figure' src={state.squares[1]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='2'>{state.squares[2] ?<img alt={'0'} className='figure' src={state.squares[2]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='3'>{state.squares[3] ?<img alt={'0'} className='figure' src={state.squares[3]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='4'>{state.squares[4] ?<img alt={'0'} className='figure' src={state.squares[4]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='5'>{state.squares[5] ?<img alt={'0'} className='figure' src={state.squares[5]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='6'>{state.squares[6] ?<img alt={'0'} className='figure' src={state.squares[6]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='7'>{state.squares[7] ?<img  alt={'0'} className='figure' src={state.squares[7]}/> : ''}</div>
         <div className='ttt-grid' onClick={clickHandler} data='8'>{state.squares[8] ?<img alt={'0'} className='figure' src={state.squares[8]}/> : ''}</div>


     </div>

    </div>
                  <div className={'players'}>
                      <h3>Score</h3>
                      <div><h3>{player1}: {score1}</h3></div>
                      <div><h3>{player2}: {score2}</h3></div>
                  </div>
                  <div className='message'><h3>{message}</h3></div>
                  {lineRed}
              </> :

              <div style={playerStyle}>
                  <h3>Chose names of players</h3>
                  <li><input value={player1} onChange={textingOne} placeholder='Player1'/></li>
                  <li><input value={player2} onChange={textingTwo} placeholder='Player2'/></li>
                  <li><button onClick={() => setClick(true)}>Choose</button></li>
              </div>
          }
          </>
  );
}

export default App;
