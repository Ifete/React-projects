import { use } from "react"
import React, { useState } from 'react';
import confetti from "canvas-confetti"

const TURNS = {
  X: 'x',
  O: 'o'
}



const Square = ({ children,isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className} key={index}>
        {children}
    </div>
  )
}

const WINNER_COMBOS = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)

  //null there is n winner, false there is a draw
  const [winner, setWinner] = useState(null)

  const restGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
      //if there is no winner
      return null
  }

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square)=>square!==null)
  }



  const updateBoard = (index) => {
    // if the square is already filled, do nothing
    if (board[index] || winner) {
      return
    }

    // update the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    console.log('updateBoard', index)

    // change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // check if there is a winner
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)//draw
    }


  }


  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={restGame}>Reset Game</button>
      <section className="game">
        {/* <!-- Board --> */
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                  {board[index]}
                </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {winner!==null && (
      <section className="winner">
        <div className="text">
          <h2>
            {winner === false
            ? 'Draw'
            : `Winner: `}
          </h2>

          <header className="win">
            {winner && <Square>{winner}</Square>}
          </header>

          <footer>
            <button onClick={restGame}>
              Reset game
            </button>
          </footer>
        </div>
        </section>
        )
      }
    </main>
  )
}

export default App
