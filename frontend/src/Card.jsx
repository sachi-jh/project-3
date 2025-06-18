import './Card.css'

const Card = ({title, text, img}) => {
    return(
        <>
        <div className="card">
            <h3>{title}</h3>
            <p>{text}</p>
            <img src={img} alt="card img"/>
            <div className='card-buttons'>
                <button>Upvote</button>
                <button>Delete</button>
            </div>
        </div>
        </>
    );
};
export default Card;
