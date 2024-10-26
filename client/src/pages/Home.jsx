
import React, {useState} from 'react';

import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [cityOrigin, setCityOrigin] = useState('');
    const [cityDestination, setCityDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [noAdults, setNoAdults] = useState('');
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
        <div className='has-background-info-light'>
            <div className="container">
                <header className="section">
                    <div className="columns is-vcentered">
                        <div className="column is-4"
                        style={{padding: '0'}}
                        >
                            <h1 className="title">Travel Inquirer</h1>
                            <h3 className="subtitle">Your trusted site for travelling across United States of America</h3>
                            <h3 className="subtitle">Where to ..</h3>
                            <h4 className="subtitle">Make your choices</h4>
                        </div>
                    </div>
                </header>
                    
                <form onSubmit={handleSubmit} className="box is-rounded has-background-info">
                    <p className="is-size-5">Choose Your Destination</p>
                    
                    <input 
                    className="input is-rounded mr-5 ml-5 mb-5"  
                    style={{width:'300px'}}
                    type="text"
                    value={cityOrigin}
                    onChange={(e) => setCityOrigin(e.target.value)}
                    placeholder="Enter city of origin"
                    />   

                    <input
                    className="input is-rounded mr-5 ml-5"
                    style={{width:'300px'}}
                    type="text"
                    value={cityDestination}
                    onChange={(e) => setCityDestination(e.target.value)}
                    placeholder="Enter destination city"
                    /> 
                    <input
                    className="input is-rounded ml-5 mb-5"
                    style={{width:'300px'}}
                    type="number"
                    value={noAdults}
                    onChange={(e) => setNoAdults(e.target.value)}
                    placeholder="Enter number of adults"
                    />
                    <div className="columns">
                    <div className="column">
                        <label className="label">Start Date:</label>   
                        <input 
                        className='input is-rounded mr-5 ml-5'
                        style={{width:'300px'}}
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label">End Date:</label>
                        <input
                        className='input is-rounded'
                        style={{width:'300px'}}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    </div>                   
                    <label className="label ml-10">Choose Your Budget</label>
                    <div className="field-body" ml-10>
                    <div className="field ml-10">
                        <div className="control">
                        <label className="radio ml-5 pl-5">
                            <input
                            type="radio"
                            value="economy"
                            checked={budget === 'economy'}
                            onChange={() => setBudget('economy')}
                            /> Economy
                        </label>
                        <label className="radio">
                            <input
                            type="radio"
                            value="business"
                            checked={budget === 'business'}
                            onChange={() => setBudget('business')}
                            /> Business
                        </label>
                        <label className="radio">
                            <input
                            type="radio"
                            value="premiumEconomy"
                            checked={budget === 'premiumEconomy'}
                            onChange={() => setBudget('premiumEconomy')}
                            /> Premium Economy
                        </label>
                        </div>
                    </div>
                    </div>
                </form>

                <section className="section">
                    <div className="columns">
                    <div className="column">
                        <figure className="image is-4by3">
                        <img src="/miami.jpg" alt="Miami"></img>
                        </figure>
                        <p>Miami</p>
                    </div>
                    <div className="column">
                        <figure className="image is-4by3">
                        <img src="/san-francisco.jpg" alt="San Francisco"></img>
                        </figure>
                        <p>San Francisco</p>
                    </div>
                    <div className="column">
                        <figure className="image is-4by3">
                        <img src="/grand-canyon.jpg" alt="Grand Canyon"></img>
                        </figure>
                        <p>Grand Canyon</p>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default Home;
