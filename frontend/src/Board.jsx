import { Link } from 'react-router';
import './Board.css'

const Board = ({id, title, img, category}) => {
    return(
        <>
        <div className="board">
            <img src={img} alt="board img"></img>
            <h3>{title}</h3>
            <p>{category}</p>
            <button><Link to={`/board/${id}`} state={{title: title, category: category}}>View Board</Link></button>
            <button>Delete Board</button>
        </div>
        </>
    );
};
export default Board;
