import { Link, useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import Card from "./Card";
import "./BoardDetails.css";
import CreateNewCardForm from "./CreateNewCardForm";
import ViewCardModal from "./ViewCardModal";
const dbApiPath = import.meta.env.VITE_API_PATH;


const BoardDetails = () => {
  const { id } = useParams();
  //const { title, category } = useLocation().state;
  const [boardData, setBoardData] = useState(null);
  const [createCardModal, setCreateCardModal] = useState(false);
  const [viewCardModal, setViewCardModal] = useState(false);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const callBackendAPI = async () => {
      try {
        const response = await fetch(`${dbApiPath}/boards/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const body = await response.json();
        setBoardData(body);

      } catch (error) {
        console.log(error);
      }
    };
    callBackendAPI();
  }, []);

  const openNewCardForm = () => {
    setCreateCardModal(true);
  }
  const closeNewCardForm = () => {
    setCreateCardModal(false);
  }

  const openViewCardModal = (id) => {
    setViewCardModal(true);
    setCardData(boardData.cards.find(card => card.id === id));
  }
  const closeViewCardModal = () => {
    setViewCardModal(false);
    setCardData(null);
  }


  if (!boardData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Link to="/">Back to Board List</Link>
      <h2>{boardData.title}</h2>
      <h3>{boardData.category}</h3>
      <button onClick={openNewCardForm}>Create a Card</button>
      <div className="cards-list">
        {boardData?.cards?.map((card) => {
            return <Card key={card.id} id={card.id} title={card.title} text={card.text} img={card.image_url} upvotes={card.upvotes} author={card.author} pinnedBool={card.isPinned} openViewCardModal={openViewCardModal}/>;
        })}
      </div>
      {createCardModal &&
        <div className={createCardModal ? 'shown' : 'hidden'}>
          <CreateNewCardForm closeNewCardForm={closeNewCardForm} id={id}/>
        </div>
      }
      {viewCardModal &&
        <ViewCardModal id={cardData.id} closeViewCardModal={closeViewCardModal}/>
      }
    </>
  );
};
export default BoardDetails;
