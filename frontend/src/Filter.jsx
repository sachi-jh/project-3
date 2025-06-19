import { useState } from "react";

const FilterCategoryEnum = {
    all: "",
    recent: "recent",
    celebration: "Celebration",
    thankyou :"Thank You",
    inspiration :"Inspiration",
};

const Filter = ({filterBoards}) => {
    const [value, setValue] = useState(FilterCategoryEnum.all);

    const handleChange = async (value) => {
        setValue(value);
        await filterBoards(value);
    }

    return(
        <>
        <form>
            <select name="filter" id="filter" onChange={e => handleChange(e.target.value)} value={value}>
                <option value={FilterCategoryEnum.all}>All</option>
                <option value={FilterCategoryEnum.recent}>Recent</option>
                <option value={FilterCategoryEnum.celebration}>Celebration</option>
                <option value={FilterCategoryEnum.thankyou}>Thank you</option>
                <option value={FilterCategoryEnum.inspiration}>Inspiration</option>
            </select>
        </form>
        </>
    )
}
export default Filter
