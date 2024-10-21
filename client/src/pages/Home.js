import React from 'react';
import {UserData} from '../interfaces/userData';
const Home = () => {

    return (
        <div>
            <h1>Travel Inquirer</h1>   
            <h3>Your trusted site for travelling across United States of America</h3>
            <h3>Where to ..</h3> 
            <h4>Make your choices</h4> 
            <p>Select Date</p>
            {/*TODO add functionality to select start-date and end-date from calendar*/}
        
            <p>Choose Your Destination</p>
            <label htmlFor="city">Enter name of a city in US:</label>
            <input type="text" id="city" required />
            <p>Choose your budget sign:</p>
            <div>
                <label><input type="checkbox" value="$" />$</label>
                <label><input type="checkbox" value="$$" /> $</label>
                <label><input type="checkbox" value="$$$" />$$$</label>
            </div>        
            <button className="" type="submit">Submit</button>   
             {/* TODO add functionality to display response*/}
        </div>
    );
}
export default Home;
