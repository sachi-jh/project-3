import './Card.css'
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
const dbApiPath = import.meta.env.VITE_API_PATH;


const Card = ({id, title, text, img, upvotes, author, pinnedBool}) => {
    const [upvote,  setUpvote] = useState(upvotes);
    const [isPinned, setIsPinned] = useState(pinnedBool);

    const deleteCard = async (id) => {
        const deleteCardURL = dbApiPath + "/boards/cards/" + id;
        try {
          const response = await fetch(deleteCardURL, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete card");
          }
          const body = await response.json();
          console.log(body);
        } catch (error) {
          console.log(error);
        }
        window.location.reload();
    };

    const incrementUpvote = async (id) => {
        const incrementUpvoteURL = `${dbApiPath}/boards/cards/${id}/upvote/`;
        try {
          const response = await fetch(incrementUpvoteURL, {
            method: "PUT",
          });
          if (!response.ok) {
            throw new Error("Failed to update upvotes");
          }
          const body = await response.json();
          console.log(body);
        } catch (error) {
          console.log(error);
        }
        setUpvote(upvote + 1);
    }

    const togglePin = async (id) => {
      const togglePinURL = `${dbApiPath}/cards/${id}/pin`;
        try {
          const response = await fetch(togglePinURL, {
            method: "PUT",
          });
          if (!response.ok) {
            throw new Error("Failed to update pin");
          }
          const body = await response.json();
          //console.log(body);
        } catch (error) {
          console.log(error);
        }
      setIsPinned(!isPinned);
      window.location.reload();
    }

    return(
        <>
        <div className="card">
            <h3>{title}</h3>
            <p>{text}</p>
            <img src={img} alt="card img"/>
            <p>{author}</p>
            <div className='card-buttons'>
                <button onClick={() => incrementUpvote(id)}>Upvote: {upvote}</button>
                <button onClick={() => deleteCard(id)}>Delete</button>
                <button onClick={() => togglePin(id)}><FontAwesomeIcon icon={faThumbtack}  className={isPinned ? 'pin' : ''}/></button>
            </div>
        </div>
        </>
    );
};
export default Card;
