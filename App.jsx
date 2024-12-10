import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [winningBoxes, setWinningBoxes] = useState([]);
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];


const checkWinner=()=>{
    winningCombinations.map((array)=>{
      if(board[array[0]] !==null && board[array[0]] ==board[array[1]] && board[array[2]]){
        if(board[array[0]] == "X"){
          setXScore(xScore + 1);
        }else{
          setOScore(oScore +1); 
        }
        setWinningBoxes(array)
        setIsGameOver(true);
      }
    })

}

  const handleClick = (index) => {
    let square = board;
    // console.log(square);
    if(isGameOver) return;
    if (board[index] == null) {
      if (isXTurn == true) {
        square[index] = "X";
        setIsXTurn(false);
      } else {
        square[index] = "O";
        setIsXTurn(true);
      }
      // console.log(square);
      
      // setIsXTurn(!isXTurn);
      setBoard([...square]);
      checkWinner();
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Tic Tac Toe
        </h1>

        {/* Display Scores */}
        <div className="flex justify-between mb-4">
          <div className="text-lg font-semibold text-gray-800">X: {xScore}</div>
          <div className="text-lg font-semibold text-gray-800">O:  {oScore}</div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`${winningBoxes[0]==index || winningBoxes[1]==index || winningBoxes[2]==index && isGameOver ? "text-green-500 shadow-md" : 'bg-gray-800'} w-24 h-24 bg-gray-200 border-2 border-gray-300 rounded-lg text-3xl font-bold text-gray-700 flex items-center justify-center`}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Message */}
        <div className="text-center mb-4">
          <span className="text-lg text-gray-700">{}</span>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
