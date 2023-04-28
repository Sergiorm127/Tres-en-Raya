import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom =(boardToCheck) => {
    //revisamos todas las combinaciones ganadoras
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
      return null
  }

  export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate, si no gay mas espacios vacios en el tablero
    //every es para revisar todas las casillas del square
    return newBoard.every((square) => square != null)
  }