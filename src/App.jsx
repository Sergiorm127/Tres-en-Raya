import { useState } from "react"
import confetti from "canvas-confetti"// primero en la terminal : npm install canvas-confeti -E

import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom , checkEndGame} from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null no ganador y false empate

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) =>{
    //no actualizamos la posicion si ya tiene algo
    if(board[index] || winner) return

    //con esto se copia las caracteristicas que tiene board para no modificar el original
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }

  }
   
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezor de nuevo</button>
      <section className="game">
        {
          board.map((square, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
                </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      
        <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
