export default function Cell({isWinning, value, onCellClick}){
    return (
    <button 
        className={isWinning ? 'square--winning' : 'square'}
        onClick={onCellClick}
    >
        {value}
    </button>
    )
}