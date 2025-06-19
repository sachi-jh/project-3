import './CreateNewBoardForm.css'

const CategoryEnum = {
    inspiration: "Inspiration",
    celebration: "Celebration",
    thankyou: "Thank you"
}

const CreateNewBoardForm = ({closeNewBoardForm}) => {


    const createNewBoard = async () => {
        const createBoardURL = "http://localhost:3000/boards/";
      try {
        const response = await fetch(deleteBoardURL, {
          method: "POST",
          body: JSON.stringify({
            title: title,
            category: category,
            author: author,
            image_url: "https://picsum.photos/200/300",
          })
        });
        if (!response.ok) {
          throw new Error("Failed to create board");
        }
        const body = await response.json();
        console.log(body);
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <div id="Modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewBoardForm}>&times;</span>
          <form id="createNewBoardForm" onSubmit={createNewBoard}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title"  name="title" placeholder="Enter a title" required/>

            <label htmlFor="category">Category:</label>
            <select id="category" name="category">
              <option value={CategoryEnum.inspiration}>Inspiration</option>
              <option value={CategoryEnum.celebration}>Celebration</option>
              <option value={CategoryEnum.thankyou}>Thank You</option>
            </select>

            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" placeholder="Enter your name (optional)"/>

            <button type="submit">Create Board</button>
          </form>
        </div>
      </div>
    );
}
export default CreateNewBoardForm
