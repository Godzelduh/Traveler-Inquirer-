import sequelize from '../config/connection.js';
import { User, UserFactory } from './user.js';
import { Trip, TripFactory } from './trip.js';

const UserM = UserFactory(sequelize);
const TripM = TripFactory(sequelize);


UserM.associate();
TripM.belongsTo(UserM, { foreignKey: 'userId', as: 'user' });

export { User };
export { Trip };