import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};


const Board = () => {
  const [squares, setSquares] = useState(Array(25).fill(null)); 
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (squares[index] || winner) return; 

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner);
    }
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  const calculateWinner = (squares) => {

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5 - 4; j++) {
        const line = [i * 5 + j, i * 5 + j + 1, i * 5 + j + 2, i * 5 + j + 3, i * 5 + j + 4];
        if (line.every((index) => squares[index] === 'X')) return 'X';
        if (line.every((index) => squares[index] === 'O')) return 'O';
      }
    }

    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < 5 - 4; i++) {
        const line = [i * 5 + j, (i + 1) * 5 + j, (i + 2) * 5 + j, (i + 3) * 5 + j, (i + 4) * 5 + j];
        if (line.every((index) => squares[index] === 'X')) return 'X';
        if (line.every((index) => squares[index] === 'O')) return 'O';
      }
    }

    for (let i = 0; i < 5 - 4; i++) {
      for (let j = 0; j < 5 - 4; j++) {
        const diag1 = [i * 5 + j, (i + 1) * 5 + j + 1, (i + 2) * 5 + j + 2, (i + 3) * 5 + j + 3, (i + 4) * 5 + j + 4];
        const diag2 = [(i + 4) * 5 + j, (i + 3) * 5 + j + 1, (i + 2) * 5 + j + 2, (i + 1) * 5 + j + 3, i * 5 + j + 4];
        if (diag1.every((index) => squares[index] === 'X') || diag2.every((index) => squares[index] === 'X')) return 'X';
        if (diag1.every((index) => squares[index] === 'O') || diag2.every((index) => squares[index] === 'O')) return 'O';
      }
    }
    return null;
  };

  const renderStatus = () => {
    if (winner) {
      return `Wygrał gracz ${winner}`;
    } else {
      return `Teraz gra: ${isXNext ? 'X' : 'O'}`;
    }
  };

  const renderBoard = () => {
    let rows = [];
    for (let i = 0; i < 5; i++) {
      let squaresRow = [];
      for (let j = 0; j < 5; j++) {
        squaresRow.push(renderSquare(i * 5 + j));
      }
      rows.push(<div key={i} className="board-row">{squaresRow}</div>);
    }
    return rows;
  };

  return (
    <div className="game">
      <div className="game-status">{renderStatus()}</div>
      <div className="board">
        {renderBoard()}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="game-container">
      <h1>Kółko-krzyżyk 5x5</h1>
      <Board />
    </div>
  );
};

export default App;
