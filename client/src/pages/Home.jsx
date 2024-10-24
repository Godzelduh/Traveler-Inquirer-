
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

        // Dummy data
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
        ];

        navigate('/results', { state: { results, city } });
    };

    return (
        <div className='has-background-grey-light'>
            <div className="columns">
                <div className="column is-half">
                    <header className="section">
                        <div className="container">
                            <h1 className="title">Travel Inquirer</h1>
                            <h3 className="subtitle">Your trusted site for travelling across United States of America</h3>
                            <h3 className="subtitle">Where to ..</h3>
                            <h4 className="subtitle">Make your choices</h4>
                        </div>
                    </header>
                </div>
                <div className="column is-half">
                    {/* Section 2: Control section */}
                    <section className="container">
                        <div className="Homepage_searchControlsContainer__N2M0O">
                            <form onSubmit={handleSubmit}>
                                <p className="is-size-5">Choose Your Destination</p>
                                <div className="field">
                                    <label className="label">Enter City:</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <p className="is-size-5">Select Your Dates</p>
                                    <label className="label">Enter Start Date:</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Enter End Date:</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Choose Your Budget:</label>
                                    <div className="control">
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                value="$"
                                                checked={budget === '$'}
                                                onChange={() => setBudget('$')}
                                            /> $
                                        </label>
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                value="$$"
                                                checked={budget === '$$'}
                                                onChange={() => setBudget('$$')}
                                            /> $$
                                        </label>
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                value="$$$"
                                                checked={budget === '$$$'}
                                                onChange={() => setBudget('$$$')}
                                            /> $$$
                                        </label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-primary" type="submit">Search My Vacation Info</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
            {/* Section 3 :Image Container Section */}
            <section className="section">
                <div className="container">
                    <div className="columns">
                        {/* <!-- Image 1 --> */}
                        <div className="column">
                            <figure className="image is-4by3">
                                <img src="https://via.placeholder.com/300x225" alt="Placeholder Image 1"></img>
                            </figure>
                        </div>
                        {/* <!-- Image 2 --> */}
                        <div className="column">
                            <figure className="image is-4by3">
                                <img src="https://via.placeholder.com/300x225" alt="Placeholder Image 2"></img>
                            </figure>
                        </div>
                        {/* <!-- Image 3 --> */}
                        <div className="column">
                            <figure className="image is-4by3">
                                <img src="https://via.placeholder.com/300x225" alt="Placeholder Image 3"></img>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Home;
