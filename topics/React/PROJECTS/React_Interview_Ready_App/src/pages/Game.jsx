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

/**
 * GAME PAGE COMPONENT
 * Interview Topic: Redux Integration & Game Logic
 * 
 * Purpose: Tic-Tac-Toe game using Redux for state management
 * Interview Points:
 * 1. Redux hooks (useSelector, useDispatch)
 * 2. Dispatching actions
 * 3. Selecting state with selectors
 * 4. Game logic implementation
 * 5. Component structure
 */

function Game() {
  // Redux hooks - Interview: Explain useSelector and useDispatch
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const winner = useSelector(selectWinner);
  const gameOver = useSelector(selectGameOver);
  const scores = useSelector(selectScores);
  const canUndo = useSelector(selectCanUndo);

  /**
   * Handle cell click
   * Interview: Explain event handling and action dispatching
   */
  const handleCellClick = (index) => {
    if (!gameOver && !board[index]) {
      dispatch(makeMove(index));
    }
  };

  /**
   * Handle reset game
   * Interview: Explain action creators
   */
  const handleResetGame = () => {
    dispatch(resetGame());
  };

  /**
   * Handle reset scores
   */
  const handleResetScores = () => {
    dispatch(resetScores());
  };

  /**
   * Handle undo move
   * Interview: Explain undo/redo implementation
   */
  const handleUndo = () => {
    if (canUndo) {
      dispatch(undoMove());
    }
  };

  /**
   * Render cell
   * Interview: Explain component composition
   */
  const renderCell = (index) => {
    return (
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
  };

  return (
    <div className="game-page">
      <h1>Tic-Tac-Toe Game 🎮</h1>
      
      {/* Game Info Section */}
      <div className="game-info">
        {!gameOver ? (
          <h2>Current Player: <span className="player">{currentPlayer}</span></h2>
        ) : (
          <h2 className="game-result">
            {winner === 'draw' 
              ? "It's a Draw! 🤝" 
              : `Player ${winner} Wins! 🎉`}
          </h2>
        )}
      </div>

      {/* Game Board */}
      <div className="game-board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderCell)}
      </div>

      {/* Game Controls */}
      <div className="game-controls">
        <button 
          onClick={handleResetGame}
          className="btn btn-primary"
        >
          New Game
        </button>
        
        <button 
          onClick={handleUndo}
          className="btn btn-secondary"
          disabled={!canUndo}
        >
          Undo Move
        </button>
        
        <button 
          onClick={handleResetScores}
          className="btn btn-danger"
        >
          Reset Scores
        </button>
      </div>

      {/* Scoreboard */}
      <div className="scoreboard">
        <h3>Scoreboard 📊</h3>
        <div className="scores">
          <div className="score-item">
            <span className="score-label">Player X:</span>
            <span className="score-value">{scores.X}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Player O:</span>
            <span className="score-value">{scores.O}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Draws:</span>
            <span className="score-value">{scores.draws}</span>
          </div>
        </div>
      </div>

      {/* Interview Notes Section */}
      <div className="interview-notes">
        <h3>🎯 Interview Topics Demonstrated</h3>
        <ul>
          <li><strong>Redux State Management:</strong> useSelector, useDispatch</li>
          <li><strong>Action Dispatching:</strong> makeMove, resetGame, undoMove</li>
          <li><strong>Selectors:</strong> Extracting specific state slices</li>
          <li><strong>Game Logic:</strong> Win detection, turn management</li>
          <li><strong>Undo/Redo:</strong> History management pattern</li>
          <li><strong>Conditional Rendering:</strong> Game over states</li>
          <li><strong>Event Handling:</strong> Click handlers, disabled states</li>
        </ul>
      </div>
    </div>
  );
}

export default Game;

/**
 * Interview Questions to Prepare:
 * 
 * Q1: What is useSelector and how does it work?
 * A: useSelector is a Redux hook that extracts data from the Redux store.
 *    - Takes a selector function
 *    - Returns selected state
 *    - Component re-renders when selected state changes
 *    - Can use multiple useSelector calls
 * 
 * Q2: What is useDispatch?
 * A: useDispatch returns the dispatch function from Redux store.
 *    - Used to dispatch actions
 *    - Triggers state updates
 *    - Can dispatch sync or async actions
 * 
 * Q3: What are selectors and why use them?
 * A: Selectors are functions that extract specific state.
 *    Benefits:
 *    - Encapsulate state shape
 *    - Reusable across components
 *    - Can be memoized
 *    - Easier refactoring
 * 
 * Q4: How do you implement undo/redo in Redux?
 * A: Store history of states:
 *    - Push current state before changes
 *    - Pop from history to undo
 *    - Can implement redo with future stack
 *    - Consider memory usage
 * 
 * Q5: When does a component re-render with Redux?
 * A: Component re-renders when:
 *    - Selected state changes (useSelector)
 *    - Props change
 *    - Parent re-renders (unless memoized)
 *    - Context changes
 * 
 * Q6: How do you optimize Redux performance?
 * A: - Use specific selectors (not whole state)
 *    - Memoize selectors with reselect
 *    - Use React.memo for components
 *    - Normalize state shape
 *    - Batch actions when possible
 * 
 * Q7: What is the difference between local state and Redux state?
 * A: Local state (useState):
 *    - Component-specific
 *    - Simpler
 *    - Lost on unmount
 *    
 *    Redux state:
 *    - Global/shared
 *    - Persists across components
 *    - More boilerplate
 *    - Better for complex state
 * 
 * Q8: How do you handle game logic in React?
 * A: - Store game state in Redux/state
 *    - Implement win detection algorithm
 *    - Manage turns and moves
 *    - Handle game over conditions
 *    - Track history for undo
 * 
 * Q9: What is action dispatching?
 * A: Sending actions to Redux store to trigger state updates.
 *    dispatch(actionCreator(payload))
 *    - Actions are plain objects
 *    - Reducers process actions
 *    - State updates immutably
 * 
 * Q10: How do you structure a game component?
 * A: - Separate state management (Redux)
 *    - Game logic in reducers
 *    - UI in components
 *    - Controls in separate section
 *    - Display game status clearly
 */

// Made with ❤️ for Interview Preparation
