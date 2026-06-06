import { useSelector, useDispatch } from 'react-redux';
import {
  makeMove,
  resetGame,
  resetScores,
  undoMove,
  selectBoard,
  selectCurrentPlayer,
  selectWinner,
  selectGameOver,
  selectScores,
  selectCanUndo
} from '../store/slices/gameSlice';
import InterviewQuestionSet from '../components/interview/InterviewQuestionSet';
import { pageInterviewQuestions } from '../data/interviewBank';

function Game() {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const winner = useSelector(selectWinner);
  const gameOver = useSelector(selectGameOver);
  const scores = useSelector(selectScores);
  const canUndo = useSelector(selectCanUndo);

  const handleCellClick = (index) => {
    if (!gameOver && !board[index]) {
      dispatch(makeMove(index));
    }
  };

  const renderCell = (index) => (
    <button
      key={index}
      className={`game-cell ${board[index] ? 'filled' : ''}`}
      onClick={() => handleCellClick(index)}
      disabled={gameOver || board[index]}
      aria-label={`Cell ${index + 1}`}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="game-page">
      <header className="page-header">
        <p className="page-eyebrow">Redux Practice</p>
        <h1 className="page-title">Tic-Tac-Toe Game</h1>
        <p className="page-subtitle">
          A compact Redux example for actions, selectors, derived state, and undo behavior.
        </p>
      </header>

      <div className="game-info">
        {!gameOver ? (
          <h2>Current Player: <span className="player">{currentPlayer}</span></h2>
        ) : (
          <h2 className="game-result">
            {winner === 'draw' ? 'The game is a draw.' : `Player ${winner} wins.`}
          </h2>
        )}
      </div>

      <div className="game-board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderCell)}
      </div>

      <div className="game-controls">
        <button onClick={() => dispatch(resetGame())} className="btn btn-primary">
          New Game
        </button>
        <button onClick={() => dispatch(undoMove())} className="btn btn-secondary" disabled={!canUndo}>
          Undo Move
        </button>
        <button onClick={() => dispatch(resetScores())} className="btn btn-danger">
          Reset Scores
        </button>
      </div>

      <div className="scoreboard">
        <h3>Scoreboard</h3>
        <div className="scores">
          <div className="score-item">
            <span className="score-label">Player X</span>
            <span className="score-value">{scores.X}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Player O</span>
            <span className="score-value">{scores.O}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Draws</span>
            <span className="score-value">{scores.draws}</span>
          </div>
        </div>
      </div>

      <section className="interview-notes">
        <h2>Interview Topics Demonstrated</h2>
        <ul>
          <li><strong>Redux State Management:</strong> useSelector and useDispatch</li>
          <li><strong>Action Dispatching:</strong> makeMove, resetGame, and undoMove</li>
          <li><strong>Selectors:</strong> extracting specific state slices</li>
          <li><strong>Game Logic:</strong> win detection and turn management</li>
        </ul>
      </section>

      <InterviewQuestionSet {...pageInterviewQuestions.game} />
    </div>
  );
}

export default Game;
