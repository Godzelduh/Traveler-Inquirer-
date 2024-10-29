import React from 'react';
import 'bulma/css/bulma.css';

const Home = () => {
    return (
        <div className='has-background-info-light pl-28'>
            <div className="container">
                <header className="section">
                    <div className="columns is-vcentered is-centered">
                        <div className="column is-half has-text-centered">
                            <h1 className="title is-size-1 has-text-weight-bold">Travel Inquirer</h1>
                            <h2 className="subtitle is-size-4 mb-4">Discover America's Hidden Treasures</h2>
                            <p className="is-size-5 mb-5">
                                From sun-kissed shores to majestic canyons, embark on a journey 
                                through America's most breathtaking destinations. Let every 
                                adventure write a new chapter in your travel story.
                            </p>
                            <div className="content">
                                <p className="is-size-5 has-text-weight-semibold mb-2">
                                    Where will your dreams take you?
                                </p>
                                <p className="is-size-6 has-text-grey">
                                    Choose your next unforgettable destination
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="section">
                    <div className="columns">
                        <div className="column has-text-centered">
                            <figure className="image is-4by3">
                                <img src="/miami.jpg" alt="Miami" />
                            </figure>
                            <p className="is-size-5 mt-3">Miami</p>
                            <p className="is-size-6 has-text-grey">Where tropical dreams come alive</p>
                        </div>
                        <div className="column has-text-centered">
                            <figure className="image is-4by3">
                                <img src="/san-francisco.jpg" alt="San Francisco" />
                            </figure>
                            <p className="is-size-5 mt-3">San Francisco</p>
                            <p className="is-size-6 has-text-grey">Where fog meets fortune</p>
                        </div>
                        <div className="column has-text-centered">
                            <figure className="image is-4by3">
                                <img src="/grand-canyon.jpg" alt="Grand Canyon" />
                            </figure>
                            <p className="is-size-5 mt-3">Grand Canyon</p>
                            <p className="is-size-6 has-text-grey">Nature's masterpiece awaits</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
