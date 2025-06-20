import Board from "./Board"
import Filter from "./Filter"
import Search from "./Search"
import { useEffect, useState } from "react"
import "./Dashboard.css"
import CreateNewBoardForm from "./CreateNewBoardForm"
const dbApiPath = import.meta.env.VITE_API_PATH;


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [createBoardModal, setCreateBoardModal] = useState(false);


    useEffect(() => {
        const callBackendAPI = async () => {
            const fetchAllURL = dbApiPath + "/boards";
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
          };
        callBackendAPI();
      }, []);

    ///filter boards by category or creation date --> refactor to remove fetch and filter on client side
    const filterBoards = async (val) => {
        if(val !== "recent"){
            const fetchCategoryURL = dbApiPath + "/boards?category=" + val;
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
            const fetchAllURL = dbApiPath + "/boards";
            try {
                const response = await fetch(fetchAllURL);
                if (!response.ok) {
                  throw new Error("Failed to fetch data");
                }
                const body = await response.json();
                const recent = body.slice(-6).reverse();
                setData(recent);
            } catch (error) {
                console.log(error);
            }
        }
    }
    //searches by title
    const searchBoards = async (val) => {
        event.preventDefault();
        const searchedData = data.filter((board) => board.title.toLowerCase().includes(val.toLowerCase()));
        setData(searchedData);
        if(val === "" || searchedData.length == 0) {
            const fetchAllURL = dbApiPath + "/boards";
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

    //handle new board form
    const openNewBoardForm = () => {
        setCreateBoardModal(true);
    }
    const closeNewBoardForm = () => {
        setCreateBoardModal(false);
    }

    //loading screen
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
        <button className="create-board" onClick={openNewBoardForm}>Create New Board</button>
        <div className="board-list">
            {data.map((board) => {
                return <Board key={board.id} id={board.id} title={board.title} img={board.image_url} category={board.category}/>
            })}
        </div>
        {createBoardModal &&
            <div className={createBoardModal ? 'shown' : 'hidden'}>
                <CreateNewBoardForm closeNewBoardForm={closeNewBoardForm} setData={setData} data={data}/>
            </div>
        }
        </>
    );
};
export default Dashboard;
