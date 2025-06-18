import { Link, useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import Card from "./Card";
import "./BoardDetails.css";

const BoardDetails = () => {
  const { id } = useParams();
  const { title, category } = useLocation().state;

  const [boardData, setBoardData] = useState(null);

  useEffect(() => {
    const callBackendAPI = async () => {
      try {
        const response = await fetch(`http://localhost:3000/boards/${id}`);
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

  if (!boardData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Link to="/">Back to Board List</Link>
      <h2>{title}</h2>
      <h3>{category}</h3>
      <button>Create a Card</button>
      <div className="cards-list">
        {boardData?.cards?.map((card) => {
            return <Card key={card.id} title={card.title} text={card.text} img={card.image_url}/>;
        })}
      </div>
    </>
  );
};
export default BoardDetails;
