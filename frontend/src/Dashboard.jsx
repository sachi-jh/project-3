import Board from "./Board"
import Filter from "./Filter"
import Search from "./Search"
import "./Dashboard.css"

const Dashboard = () => {
    return(
        <>
        <h1>Dashboard</h1>
        <div className="search-filter">
            <Search />
            <Filter />
        </div>
        <div className="board-list">
            <Board />
            <Board />
            <Board />
            <Board />
            <Board />
            <Board />
        </div>

        </>
    );
};
export default Dashboard;
