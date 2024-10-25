import React, { useState} from 'react'; 
import{ userLogin} from '../interfafces/userLogin';

const Login = () => {
    //Step 1: Add state to manage form data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    //Step 2: Update state on input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // Step 3: Handle form submission
    const handleSubmit =(event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted', formData);
        // You can send formData to a server here
    }
       
    return (
        <div>
            <h2>Travel Inquirer</h2>    
            <h3>Sign Up</h3> 
            <form className="" onSubmit={handleSubmit}> {/* Add onSubmit handler */}
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    
                    onChange={handleChange}  
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    
                    onChange={handleChange}  
                    required
                />
                <button className="" type="submit">Submit</button>
            </form>
            <aside>
                <h1> The trip of your dreams starts with Trip Inquirer</h1>
                <img src= '/backpack-traveller.jpg' alt='Backpack Traveller' /> 
                {/* a small impage could be use on the top left corner / as a back ground for aside element*/}
                <article>
                    <p>With insights on hundreds of destinations and endless experiences, 
                       Travel Inquirer is your go-to guide for smarter, more efficient travel.
                    </p>
                </article>
            </aside>
        </div>
    );
};
export default Login;
