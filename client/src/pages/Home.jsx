import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        // Pass parameters to the results page
        // navigate('/DisplayResult', { state: { city, startDate, endDate, budget } }); //to navigate to DisplayResult page?
    
        // send a fetch request to the server /api/trips to get all trips based of user input
        
        // fetch("/api/trips", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         city, startDate, endDate, budget
        //     })
        // })
        // .then(res => res.json())
        // .then(results => {
               // dummy data
                const results = [
                    {
                        city: "New York",
                        startDate: "10/24/24",
                        endDate: "10/25/24",
                        budget: 1000
                    },
                    {
                        city: "London",
                        startDate: "10/28/24",
                        endDate: "10/31/24",
                        budget: 5000
                    }
                ]

            navigate('/results', { state: { results, city } });
        // })

        
    
    };
    return (
 
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
    );
}
export default Home;
