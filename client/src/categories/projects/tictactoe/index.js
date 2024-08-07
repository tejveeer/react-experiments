import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

import './tictactoe.css';

const checkWinner = (board) => {
  const winningStates = [
    // horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // verticals
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const state of winningStates) {
    const allSame = state
      .map((pos) => board[pos])
      .every((val, _, arr) => val !== ' ' && val === arr[0]);

    if (allSame) {
      console.log(state);
      return true;
    }
  }
  return false;
};

const GameHistory = ({ data, idx, setGameHistory, deleteGameHistory }) => {
  const [id, history] = data;
  return (
    <>
      <li key={id}>
        <div
          className='game-id'
          onClick={() => setGameHistory(history)}
        >
          Game {idx + 1}
        </div>
        <div
          className='delete'
          onClick={() => deleteGameHistory(id, idx)}
        ></div>
      </li>
    </>
  );
};

const SettingsInterface = ({
  setBoard,
  setHasGameFinished,
  history,
  setHistory,
  setViewingHistory,
  setMessage,
}) => {
  const [gameHistories, setGameHistories] = useState([]);

  // populate gameHistories
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:2500/tictactoe/get-histories', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await res.json();
      setGameHistories(result);
    };

    fetchData();
  }, []);

  const restartGame = () => {
    setBoard([...Array(9).keys()].map(() => ' '));
    setHasGameFinished(false);
    setViewingHistory(false);
    setHistory([]);
    setMessage('');
  };

  const saveGame = async () => {
    const res = await fetch('http://localhost:2500/tictactoe/save-histories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ history }),
    });

    if (res.status === 200) {
      console.log('Saved successfully!');

      const { id } = await res.json();
      setGameHistories([...gameHistories, [id, history]]);
    }
  };

  const setGameHistory = (gameHistory) => {
    setMessage('Viewing previous game history.');
    setBoard(gameHistory[0]);
    setViewingHistory(true);
    setHasGameFinished(true);
    setHistory(gameHistory);
  };

  const deleteGameHistory = async (id, idx) => {
    const res = await fetch(
      'http://localhost:2500/tictactoe/delete-histories',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      },
    );

    if (res.status === 200) {
      const gameHistoriesCopy = gameHistories.slice();
      gameHistoriesCopy.splice(idx, 1);

      setGameHistories(gameHistoriesCopy);
      console.log('deleted');
    }
  };

  return (
    <>
      <div className='previous-games'>
        <span>Previous Games</span>
        <ul>
          {gameHistories.map((data, idx) => (
            <GameHistory
              data={data}
              idx={idx}
              setGameHistory={setGameHistory}
              deleteGameHistory={deleteGameHistory}
            />
          ))}
        </ul>
        <div className='buttons'>
          <button onClick={restartGame}>Restart</button>
          <button onClick={saveGame}>Save</button>
        </div>
      </div>
    </>
  );
};

const TicTacToe = () => {
  const [board, setBoard] = useState([...Array(9).keys()].map(() => ' '));
  const [hasGameFinished, setHasGameFinished] = useState(false);

  const [history, setHistory] = useState([]);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [message, setMessage] = useState('');

  const setBoardPosition = (pos) => {
    setMessage('');
    if (viewingHistory && !hasGameFinished) {
      // should likely have a component for "previous move"
      setMessage(
        <div>
          You are currently viewing the game history. Go back to
          <div
            className='previous-move'
            onClick={() => resetBoard(history.length - 1)}
          >
            Move {history.length}
          </div>
          to be able to add
        </div>,
      );
      return;
    } else if (hasGameFinished) {
      setMessage(message);
      return;
    }

    const count = history.length;
    const player = count % 2 === 0 ? 'X' : 'O';

    if (board[pos] === ' ') {
      const newBoard = board.slice();
      newBoard[pos] = player;

      setHistory([...history, newBoard]);
      setBoard(newBoard);

      if (checkWinner(newBoard)) {
        setMessage(`${player} is the winner!`);
        setHasGameFinished(true);
      } else if (count + 1 === 9) {
        setMessage('Game Finished!');
        setHasGameFinished(true);
      }
    } else if (count === 9) {
      setMessage('Game Finished!');
    } else {
      setMessage(`Position ${pos} is already taken. Please try another one.`);
    }
  };

  const resetBoard = (boardIdx) => {
    const wantedBoard = history[boardIdx];
    setBoard(wantedBoard);

    if (wantedBoard === history[history.length - 1]) {
      setViewingHistory(false);
    } else {
      setViewingHistory(true);
    }
  };

  return (
    <>
      <div className='outer'>
        <div className='area'>
          <div className='game'>
            <div className='board'>
              {board.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => setBoardPosition(idx)}
                >
                  {val}
                </button>
              ))}
            </div>
            <p>{message}</p>
          </div>
          <div className='game-history'>
            {history.map((_, idx) => (
              <div
                className='previous-move'
                onClick={() => resetBoard(idx)}
              >
                Move {idx + 1}
              </div>
            ))}
          </div>
        </div>
        <SettingsInterface
          setBoard={setBoard}
          setHasGameFinished={setHasGameFinished}
          history={history}
          setHistory={setHistory}
          setViewingHistory={setViewingHistory}
          setMessage={setMessage}
        />
      </div>
    </>
  );
};

export default TicTacToe;
