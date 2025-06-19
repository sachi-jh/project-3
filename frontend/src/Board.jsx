import { Link } from 'react-router';
import './Board.css'

const Board = ({id, title, img, category}) => {
    const deleteBoard = async (id) => {
      const deleteBoardURL = "http://localhost:3000/boards/" + id;
      try {
        const response = await fetch(deleteBoardURL, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete board");
        }
        const body = await response.json();
        console.log(body);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    };
    return(
        <>
        <div className="board">
            <img src={img} alt="board img"></img>
            <h3>{title}</h3>
            <p>{category}</p>
            <button><Link to={`/board/${id}`} state={{title: title, category: category}}>View Board</Link></button>
            <button onClick={() => deleteBoard(id)}>Delete Board</button>
        </div>
        </>
    );
};
export default Board;
