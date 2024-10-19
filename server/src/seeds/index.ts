import { userSeeds } from "./user-seeds.js";
import sequelize from "../config/connection.js";

const seedAll = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced');

        await userSeeds();
        console.log('Users seeded');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAll();