import { data } from 'react-router';
import './CreateNewBoardForm.css'
import {useState} from 'react'

const CategoryEnum = {
    inspiration: "Inspiration",
    celebration: "Celebration",
    thankyou: "Thank you"
}

const CreateNewBoardForm = ({closeNewBoardForm, setData, data}) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(CategoryEnum.inspiration);
    const [author, setAuthor] = useState("");


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    }

    const createNewBoard = async (event) => {
        event.preventDefault();
        const createBoardURL = "http://localhost:3000/boards/";
        try {
            const response = await fetch(createBoardURL, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                category: category,
                image_url: "https://picsum.photos/200/300"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            if (!response.ok) {
            throw new Error("Failed to create board");
            }
            const body = await response.json();
            setData([...data, body]);
        } catch (error) {
            console.log(error);
        }
        closeNewBoardForm();
    }


    return (
      <div id="Modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewBoardForm}>&times;</span>
          <form id="createNewBoardForm" onSubmit={createNewBoard}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title"  name="title" placeholder="Enter a title" onChange={handleTitleChange} required/>

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" onChange={handleCategoryChange}>
              <option value={CategoryEnum.inspiration}>Inspiration</option>
              <option value={CategoryEnum.celebration}>Celebration</option>
              <option value={CategoryEnum.thankyou}>Thank You</option>
            </select>

            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" placeholder="Enter your name (optional)" onChange={handleAuthorChange}/>

            <button type="submit">Create Board</button>
          </form>
        </div>
      </div>
    );
}
export default CreateNewBoardForm
