import {DataTypes, type Sequelize, Model, BelongsToCreateAssociationMixin, type Optional} from 'sequelize';
import { User } from './user';

interface TripAttributes {
    id: number;
    userId: number;
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: Date;
    returnDate: Date;
    travelers: number;
    travelClass: string;
    results: string;
    selectedOfferId: string;
    
}

interface TripCreationAttributes extends Optional<TripAttributes, 'id'> {}

export class Trip extends Model<TripAttributes, TripCreationAttributes> implements TripAttributes {
    public id!: number;
    public userId!: number;
    public originLocationCode!: string;
    public destinationLocationCode!: string;
    public departureDate!: Date;
    public returnDate!: Date;
    public travelers!: number;
    public travelClass!: string;
    public results!: string;
    public selectedOfferId!: string;

    public readonly user?: User;
    public createUser!: BelongsToCreateAssociationMixin<User>;

    public static associate() {
        Trip.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user'
        });
    }
    
}

export function TripFactory(sequelize: Sequelize): typeof Trip
{
    Trip.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        originLocationCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destinationLocationCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departureDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        travelers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        travelClass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        results: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        selectedOfferId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'trips'
    }
);


return Trip;
}