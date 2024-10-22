import {DataTypes, type Sequelize, Model, type Optional} from 'sequelize';

interface TripAttributes {
    id: number;
    destination: string;
    startDate: Date;
    endDate: Date;
    travelers: number;
    priceRange: string;
    userId: number;
}

interface TripCreationAttributes extends Optional<TripAttributes, 'id'> {}

export class Trip extends Model<TripAttributes, TripCreationAttributes> implements TripAttributes {
    public id!: number;
    public destination!: string;
    public startDate!: Date;
    public endDate!: Date;
    public travelers!: number;
    public priceRange!: string;
    public userId!: number;
}

export function TripFactory(sequelize: Sequelize): typeof Trip{
    Trip.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        travelers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priceRange: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: 'Users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: 'trips'
    }
);

return Trip;
}