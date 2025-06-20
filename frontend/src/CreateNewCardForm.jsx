import './CreateNewCardForm.css'
import { useState } from 'react';
const apiKey = import.meta.env.VITE_GIPHY_API_KEY

const CreateNewCardForm = ({closeNewCardForm, id}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [gifURL, setGifURL] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [image_url, setImage_url] = useState("");

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    }
    const handleImageURLChange = (event) => {
        setImage_url(event.target.value);
    }

    const handleGifChoice = (url) => {
        setImage_url(url);
    }


    const gifSearchReturn = async (event) => {
        //event.preventDefault();
        try{
            const queryParams = new URLSearchParams({
                api_key: apiKey,
                q: searchQuery,
                limit: 6,
                rating: "g",
                lang: "en",
                bundle: "clips_grid_picker",
                fields: "images.fixed_width.url"
              });

            const response = await fetch(`https://api.giphy.com/v1/gifs/search?${queryParams}`);
            if (!response.ok) {
                throw new Error("Failed to fetch GIFs");
            }
            const body = await response.json();
            const imgURLS = body.data.map((url) => url.images.fixed_width.url);
            setGifURL(imgURLS);
        } catch (error) {
            console.log(error)
        }
    }

    const createNewCard = async (event) => {
        event.preventDefault();
        const createCardURL = "http://localhost:3000/boards/cards";
        try {
            const response = await fetch(createCardURL, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                text: description,
                image_url: image_url,
                author: author,
                board_id: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            if (!response.ok) {
            throw new Error("Failed to create board");
            }
            const body = await response.json();
            console.log(body);
        } catch (error) {
            console.log(error);
        }
        closeNewCardForm();
        window.location.reload();
    }

    return(
        <div id="Modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewCardForm}>&times;</span>
          <form id="create-new-card-form" onSubmit={createNewCard}>
            <input type="text" id="title"  name="title" placeholder="Enter a title" required onChange={handleTitleChange} value={title}/>
            <input type="text" id="decription"  name="decription" placeholder="Enter description" required onChange={handleDescriptionChange} value={description}/>

                <input type="text" id="gif-search"  name="gif-search" placeholder="Search GIFs" onChange={handleSearchQueryChange} value={searchQuery}/>
                <button onClick={gifSearchReturn}>Search GIFS</button>
                {gifURL.length > 0 &&
                    <div className="gif-container">
                        {gifURL.map((url) => <img src={url} alt="gif" onClick={()=>handleGifChoice(url)}/>)}
                    </div>
                }
                <p>Or</p>
            <input type="text" id="image_url"  name="image_url" placeholder="enter GIF url" required onChange={handleImageURLChange} value={image_url}/>
            <input type="text" id="author" name="author" placeholder="Enter your name (optional)" onChange={handleAuthorChange} value={author}/>

            <button type="submit">Create Card</button>
          </form>
        </div>
      </div>
    )
}

export default CreateNewCardForm
