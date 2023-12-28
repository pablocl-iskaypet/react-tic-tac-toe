import { calculateWinner } from '../../hooks/GameHelper';
import Cell from './Cell/Cell';

import {useTranslation} from 'react-i18next';

export default function Board({xIsNext, cells, onPlay, winningCells}) {
    const {t} = useTranslation('common');
    const playerOne = '❌';
    const playerTwo = '⭕';
    const data = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
    ]
    function handleClick(i){
        if (calculateWinner(cells) || cells[i]) {
            return;
          }
        const nextCells = cells.slice();
        nextCells[i] = xIsNext ? playerOne : playerTwo;
        onPlay(nextCells);
    }
    const winner = calculateWinner(cells);
    let status;
    if (winner) {
         status = `${t('game.winner')}: ${xIsNext ? playerTwo : playerOne}`;
    } else if(!cells.includes(null)){
        status = t('game.tie');
    } else {
        status = `${t('game.nextplayer')}:${xIsNext ? playerOne : playerTwo}`;
    }

    return (    
        <>
        <div className="status">{status}</div>
        {
        data.map((row, index) => (
            <div className="board-row" key={row}>
                {
                row.map(cellId => (
                    <Cell
                        key={cellId}
                        isWinning={winningCells.includes(cellId)}
                        value={cells[cellId]} 
                        onCellClick={() => handleClick(cellId)}
                    />
                ))
                }
            </div>
          ))
        }
        </>
      );
}
