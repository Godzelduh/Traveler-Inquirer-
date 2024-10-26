
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

    // Navigate with all necessary state variables
    navigate('/results', {
        state: {
          cityOrigin,
          cityDestination,
          noAdults,
          startDate,
          endDate,
          budget
        }
      });
    };
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

    return (
        <div className='has-background-info-light pl-28'>
            <div className="container">
                <header className="section">
                    <div className="columns is-vcentered">
                        <div className="">
                            <h1 className="title is-size-1 has-text-weight-bold">Travel Inquirer</h1>
                            <h3 className="subtitle">Your trusted site for travelling across United States of America</h3>
                            <h3 className="subtitle">Where to ..</h3>
                            <h4 className="subtitle">Make your choices</h4>
                        </div>
                    </div>
                </header>
                    
                <form onSubmit={handleSubmit} className="box is-rounded has-background-info">
                    <p className="title ml-5">Choose Your Destination</p>

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
                            <label className="label px-5">Start Date:</label>   
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
                    
                    <div className="field ml-5" style={{marginLeft: '48px'}}>
                        <label className="label">Choose Your Budget</label>  
                        <div className="control">
                            <label className="radio mr-3">
                                <input
                                    type="radio"
                                    value="economy"
                                    checked={budget === 'economy'}
                                    onChange={() => setBudget('economy')}
                                /> 
                                <span className="ml-2">Economy</span>
                            </label>

                            <label className="radio mr-3">
                                <input
                                    type="radio"
                                    value="business"
                                    checked={budget === 'business'}
                                    onChange={() => setBudget('business')}
                                /> 
                                <span className="ml-2">Business</span>
                            </label>

                            <label className="radio">
                                <input
                                    type="radio"
                                    value="premiumEconomy"
                                    checked={budget === 'premiumEconomy'}
                                    onChange={() => setBudget('premiumEconomy')}
                                /> 
                                <span className="ml-2">Premium Economy</span>
                            </label>
                        </div>
                    
                        <button
                            className="button is-primary" 
                            style={{width:'300px',marginTop:'10px'}}
                            type="submit"
                          >  
                            Search
                        </button>
                    </div>
                </form>

                <section className="section">
                    <div className="columns">
                        <div className="column has-text-centered">
                            <figure className="image is-4by3">
                                <img src="/miami.jpg" alt="Miami"></img>
                            </figure>
                            <p>Miami</p>
                        </div>
                        <div className="column has-text-centered">
                            <figure className="image is-4by3">
                                <img src="/san-francisco.jpg" alt="San Francisco"></img>
                            </figure>
                            <p>San Francisco</p>
                        </div>
                        <div className="column has-text-centered">
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
