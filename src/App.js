import React from 'react';
import { useState } from 'react';

export function Board({ isXNext, squares, onPlay }) {
	function handleClick(i) {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		nextSquares[i] = isXNext ? 'X' : 'O';
		onPlay(nextSquares);
	}

	return (
		<>
			{[...Array(3)].map((_, rowIndex) => (
				<div className="board-row" key={rowIndex}>
					{[...Array(3)].map((_, colIndex) => {
						const index = rowIndex * 3 + colIndex;
						return (
							<Square
								key={index}
								value={squares[index]}
								onSquareClick={() => handleClick(index)}
							/>
						);
					})}
				</div>
			))}
		</>
	)
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const isXNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(move) {
		setCurrentMove(move);
	}

	const moves = history.map((move) => {
		let description;
		if (move == currentMove) {
			return (
				<li key={move}>
					<p class="history-button">{`You are at move #${move}`}</p>
				</li>
			);
		}

		if (move > 0) {
			description = `Go to move #${move}`;
		} else {
			description = `Go to game start`;
		}
		return (
			<li key={move}>
				<button class="history-button" onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	function status() {
		const winner = calculateWinner(currentSquares);
		if (winner) {
			return `Winner: ${winner}`;
		} else if (checkIfFull(currentSquares)) {
			return 'Draw';
		} else {
			return `Next player: ${isXNext ? 'X' : 'O'}`;
		}
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<div className="status">{status()}</div>
				<ol>{moves}</ol>
			</div>
		</div >
	);
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