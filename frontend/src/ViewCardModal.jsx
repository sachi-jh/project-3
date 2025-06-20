import './ViewCardModal.css'
import { useState, useEffect } from 'react';
const dbApiPath = import.meta.env.VITE_API_PATH;

const ViewCardModal = ({id, closeViewCardModal}) => {
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [cardData, setCardData] = useState({});

    useEffect(() => {
        const callBackendAPI = async () => {
            try {
              const response = await fetch(`${dbApiPath}/cards/${id}`);
              if (!response.ok) {
                throw new Error("Failed to fetch comments");
              }
              const body = await response.json();
              setCardData(body);

            } catch (error) {
              console.log(error);
            }
          };
          callBackendAPI();
    }, [id])

    console.log(cardData.comments);
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const newCommentURL = dbApiPath + "/cards/comments";
        try {
            const response = await fetch(newCommentURL, {
            method: "POST",
            body: JSON.stringify({
                text: description,
                author: author,
                card_id: cardData.id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            if (!response.ok) {
            throw new Error("Failed to create comment");
            }
            const body = await response.json();
            setCardData((prevCardData) => ({
                ...prevCardData,
                comments: [...prevCardData.comments, body] // Assuming the response contains the new comment
            }));
        } catch (error) {
            console.log(error);
        }
        setDescription("");
        setAuthor("");
    }

    return (
        <>
            <div id="Modal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeViewCardModal}>&times;</span>
                    <h3>{cardData.title}</h3>
                    <p>{cardData.text}</p>
                    <img src={cardData.image_url} alt="Card Image" />
                    {cardData.author && <p>Author: {cardData.author}</p>}

                    <form id="create-new-comment-form" onSubmit={handleCommentSubmit}>
                        <label htmlFor="comment">Comment:</label>
                        <input type="text" id="comment"  name="comment" placeholder="Enter a comment" required onChange={handleDescriptionChange} value={description}/>


                        <label htmlFor="author">Author:</label>
                        <input type="text" id="author" name="author" placeholder="Enter your name (optional)" onChange={handleAuthorChange} value={author}/>

                        <button type="submit">Post Comment</button>
                    </form>
                    <div id="comments">
                        <p>Comments: </p>
                        {cardData.comments && cardData.comments?.map((comment) => {
                            return (
                            <div key={comment.id} className="comment">
                                <p>{comment.text}</p>
                                {comment.author && <p>Author: {comment.author}</p>}
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewCardModal;
