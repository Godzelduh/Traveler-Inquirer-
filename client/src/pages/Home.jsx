import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass parameters to the results page
        navigate('/DisplayResult', { state: { city, startDate, endDate, budget } }); //to navigate to DisplayResult page?
    };
    return (
        <div className='parent-container'>
            <nav>
        <Link to="/login">Login</Link> 
        <Link to="/results">Display Results</Link>
        <Link to="/users">Display Users</Link>
      </nav>
            <header className='header'>
                <h1>Travel Inquirer</h1>
                <h3>Your trusted site for travelling across United States of America</h3>
                <h3>Where to ..</h3>
                <h4>Make your choices</h4>
                
                <div className='form-container'>
                <p>Choose Your Destination</p>
                    <form onSubmit={handleSubmit}>
                        <label>Enter City:</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                          <p>Select Your Dates</p>
                        <label>Enter Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label>Enter End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <label>Choose Your Budget icon:</label>
                        <div>
                            <input
                                type="radio"
                                value="$"
                                checked={budget === '$'}
                                onChange={() => setBudget('$')}
                            /> $
                            <input
                                type="radio"
                                value="$$"
                                checked={budget === '$$'}
                                onChange={() => setBudget('$$')}
                            /> $$
                            <input
                                type="radio"
                                value="$$$"
                                checked={budget === '$$$'}
                                onChange={() => setBudget('$$$')}
                            /> $$$
                        </div>
                        <button type="submit">Search My Vacation Info</button>
                    </form>
                </div>
            </header>
        </div>
    );
}
export default Home;
