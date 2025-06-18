import Board from "./Board"
import Filter from "./Filter"
import Search from "./Search"
import { useEffect, useState } from "react"
import "./Dashboard.css"

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const callBackendAPI = async () => {
          try {
            const response = await fetch("http://localhost:3000/boards");
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const body = await response.json();
            setData(body);

          } catch (error) {
            console.log(error);
          }
        };
        callBackendAPI();

      }, []);

    if(data.length === 0) {
        return(<div>Loading...</div>)
    }
    
    return(
        <>
        <h1>Dashboard</h1>
        <div className="search-filter">
            <Search />
            <Filter />
        </div>
        <div className="board-list">
            {data.map((board) => {
                return <Board key={board.id} id={board.id} title={board.title} img={board.image_url} category={board.category}/>
            })}
        </div>

        </>
    );
};
export default Dashboard;
