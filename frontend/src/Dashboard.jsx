import Board from "./Board"
import Filter from "./Filter"
import Search from "./Search"
import { useEffect, useState } from "react"
import "./Dashboard.css"



const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const fetchAllURL = "http://localhost:3000/boards";



    useEffect(() => {
        const callBackendAPI = async (url) => {
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              const body = await response.json();
              setData(body);

            } catch (error) {
              console.log(error);
            }
          };
        callBackendAPI(fetchAllURL);


      }, []);

    ///add recent functionality!!!
    const filterBoards = async (val) => {
        if(val !== "recent"){
            const fetchCategoryURL = "http://localhost:3000/boards?category=" + val;
            try {
                const response = await fetch(fetchCategoryURL);
                if (!response.ok) {
                throw new Error("Failed to fetch data");
                }
                const body = await response.json();
                setData(body);

            } catch (error) {
                console.log(error);
            }
        } else {
            //recent functionality

        }
    }

    const searchBoards = async (val) => {
        event.preventDefault();
        console.log(val);
        const searchedData = data.filter((board) => board.title.toLowerCase().includes(val.toLowerCase()));
        console.log(searchedData);
        setData(searchedData);
        if(val === "" || searchedData.length == 0) {
            const fetchAllURL = "http://localhost:3000/boards";
            try {
                const response = await fetch(fetchAllURL);
                if (!response.ok) {
                  throw new Error("Failed to fetch data");
                }
                const body = await response.json();
                setData(body);

              } catch (error) {
                console.log(error);
              }
        }
    }

    if(data.length === 0) {
        return(<div>Loading...</div>)
    }

    return(
        <>
        <h1>Dashboard</h1>
        <div className="search-filter">
            <Search searchBoards={searchBoards}/>
            <Filter filterBoards={filterBoards}/>
        </div>
        <button className="create-board">Create New Board</button>
        <div className="board-list">
            {data.map((board) => {
                return <Board key={board.id} id={board.id} title={board.title} img={board.image_url} category={board.category}/>
            })}
        </div>

        </>
    );
};
export default Dashboard;
