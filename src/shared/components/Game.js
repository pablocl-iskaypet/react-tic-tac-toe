import { useState } from 'react';
import Board from './Board/Board';

import { calculateWinner } from '../hooks/GameHelper';

import {useTranslation} from 'react-i18next';

export function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isDescending, setIsDescending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentCells = history[currentMove];
    const winnerMovement = calculateWinner(currentCells);

    const {t} = useTranslation('common');

    function handlePlay(nextCells) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextCells];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }
    function sortMovements(){
        setIsDescending(!isDescending);
    }
    const moves = history.map((cells, move) => {
    let col = 0;
    let row = 0;
    if (move >= 1) {
        for (let i = 0; i < history[move].length; i++) {
            if (history[move][i] !== history[move - 1][i]) {
                col = (i % 3) + 1;
                row = (i - (i % 3)) / 3 + 1;
            }
        }
    }
    let description;
    if (move > 0) {
        description = `${t('game.gotomovement')} #${move} ( ${col} , ${row} )`;
    } else {
        description = t('game.gotostart');
    }
    return (
        move && move === currentMove ? `${t('game.currentmovement')} #${move} ( ${col} , ${row} )` :
        <li className="game-info__movement" key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext} 
            cells={currentCells} 
            onPlay={handlePlay}
            winningCells={winnerMovement ? winnerMovement : []}
          />
        </div>
        <div className="game-info">
        <button onClick={ sortMovements}>{t('game.order.label')} {isDescending ? t('game.order.ascendent'):t('game.order.descendent')}</button>
        <ol>{isDescending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
}

export default Game;