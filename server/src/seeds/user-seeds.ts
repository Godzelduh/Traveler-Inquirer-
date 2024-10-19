import {User} from '../models/index.js';

export const userSeeds = async () => {
    await User.bulkCreate(
        [
            {username: 'NoName', password: 'NoPass'},
            {username: 'user2', password: 'password2'},
            {username: 'user3', password: 'password3'},
        ], 
        {individualHooks: true}

    );
};
    