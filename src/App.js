import React from 'react';
import { useState } from 'react';

export default function Board() {
	const [isXNext, setIsXNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [outcome, setOutcome] = useState(null);

	function reset() {
		setIsXNext(true);
		setSquares(Array(9).fill(null));
	}

	function nextTurn(squares) {
		let winner = calculateWinner(squares);
		if (winner) {
			return winner;
		}
		if (checkIfFull(squares)) {
			return 'draw';
		}
		setIsXNext(!isXNext);
		return null;
	}

	function handleClick(i) {
		if (squares[i] || outcome !== null) {
			return;
		}
		const nextSquares = squares.slice();
		nextSquares[i] = isXNext ? 'X' : 'O';
		setSquares(nextSquares);

		setOutcome(nextTurn(nextSquares));
	}

	return (
		<>
			<div className="status">{calculateWinner(squares) ? `Winner: ${calculateWinner(squares)}` : `Next player: ${isXNext ? 'X' : 'O'}`}</div>
			<button onClick={() => reset()}>Reset</button>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	)
}

function Square({ value, onSquareClick }) {
	return (
		<button className="square" onClick={onSquareClick}>{value}</button>
	)
}

function checkIfFull(squares) {
	for (let i = 0; i < squares.length; i += 1) {
		if (!squares[i]) {
			return false;
		}
	}
	return true;
}

function checkWinnerVertical(squares) {
	for (let y = 0; y < 3; y += 1) {
		let leftMostSquare = squares[y * 3];
		if (!leftMostSquare) {
			continue;
		}
		for (let x = 1; x < 3; x += 1) {
			if (squares[y * 3 + x] !== leftMostSquare) {
				break;
			}
			if (x === 2) {
				return leftMostSquare;
			}
		}
	}
}

function checkWinnerHorizontal(squares) {
	for (let x = 0; x < 3; x += 1) {
		let topMostSquare = squares[x];
		if (!topMostSquare) {
			continue;
		}
		for (let y = 1; y < 3; y += 1) {
			if (squares[y * 3 + x] !== topMostSquare) {
				break;
			}
			if (y === 2) {
				return topMostSquare;
			}
		}
	}
}

function checkWinnerDiagonal(squares) {
	let leftTopSquare = squares[0];
	if (leftTopSquare) {
		if (squares[4] === leftTopSquare && squares[8] === leftTopSquare) {
			return leftTopSquare;
		}
	}

	let rightTopSquare = squares[2];
	if (rightTopSquare) {
		if (squares[4] === rightTopSquare && squares[6] === rightTopSquare) {
			return rightTopSquare;
		}
	}
}

function calculateWinner(squares) {
	return checkWinnerVertical(squares) || checkWinnerHorizontal(squares) || checkWinnerDiagonal(squares);
}