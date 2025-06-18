import { Link } from 'react-router';
import Card from './Card';

const BoardDetails = () => {
    return (
        <>
        <Link to='/'>Back to Board List</Link>
        <h2>Board Title</h2>
        <button>Create a Card</button>
        <Card/>
        </>
    );
};
export default BoardDetails;
