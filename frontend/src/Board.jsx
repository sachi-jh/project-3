import { Link } from 'react-router';
import './Board.css'

const Board = () => {
    const id = 1;
    return(
        <>
        <div className="board">
            <img src="#" alt="board img"></img>
            <h3>Board Title</h3>
            <p>Board Category</p>
            <button><Link to={`/board/${id}`}>View Board</Link></button>
            <button>Delete Board</button>
        </div>
        </>
    );
};
export default Board;
