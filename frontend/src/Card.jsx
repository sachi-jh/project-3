import './Card.css'

const Card = ({id, title, text, img}) => {
    const deleteCard = async (id) => {
        const deleteCardURL = "http://localhost:3000/boards/cards/" + id;
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


    return(
        <>
        <div className="card">
            <h3>{title}</h3>
            <p>{text}</p>
            <img src={img} alt="card img"/>
            <div className='card-buttons'>
                <button>Upvote</button>
                <button onClick={() => deleteCard(id)}>Delete</button>
            </div>
        </div>
        </>
    );
};
export default Card;
