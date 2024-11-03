import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
import {  UserFactory } from './user.js';
import {  TripFactory } from './trip.js';



dotenv.config();

export interface DatabaseModels {
    User: ReturnType<typeof UserFactory>;
    Trip: ReturnType<typeof TripFactory>;   
}

export async function inititializeDatabase(): Promise<{
    sequelize: Sequelize,
    models: DatabaseModels
}> {
    const sequelize = new Sequelize( {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'TravelDB',
        logging: process.env.NODE_ENV !== 'production',
    })


const User = UserFactory(sequelize);
const Trip = TripFactory(sequelize);

User.hasMany(Trip, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'trips'
});

Trip.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});


await sequelize.authenticate();
console.log('Database connection established successfully.');

if (process.env.NODE_ENV !== 'Production') {
    await sequelize.sync({ force: true });
}

return {
    sequelize,
    models: { User, Trip }
};

}

export type Models = {
    User: ReturnType<typeof UserFactory>;
    Trip: ReturnType<typeof TripFactory>;
  };

