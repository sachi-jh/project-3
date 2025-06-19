import { useState } from "react"


const Search = ({searchBoards}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchChange = (event) =>{
        setSearchQuery(event)
    }

    const clearSearch = () => {
        setSearchQuery('')
        searchBoards('')
    }

    return (
        <>
            <form onSubmit={() => searchBoards(searchQuery)}>
                <input type="text" id="search" placeholder="search" onChange={e=>handleSearchChange(e.target.value)} value={searchQuery}></input>
                <button type="submit">Search</button>
                <button onClick={clearSearch}>Clear</button>
            </form>
        </>
    )
}
export default Search
