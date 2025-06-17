const Filter = () => {
    return(
        <>
        <form>
            <select name="filter" id="filter">
                <option value="all">All</option>
                <option value="recent">Recent</option>
                <option value="celebration">Celebration</option>
                <option value="thankyou">Thank you</option>
                <option value="inspiration">Inspiration</option>
            </select>
        </form>
        </>
    )
}
export default Filter
