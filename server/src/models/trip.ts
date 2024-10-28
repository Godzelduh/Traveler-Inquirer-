import {DataTypes, type Sequelize, Model, type Optional} from 'sequelize';
import { User } from './user';

interface TripAttributes {
    id: number;
    userId: number;
    searchParams:
    {
    fromLocation: string;
    toLocation: string;
    departureDate: Date;
    returnDate: Date;
    adults: number;
    travelClass: string;
    maxPrice: number;
    flightOfferId: string;
    itineraries: string;
    };
    results?: {
        initialOffers: FlightOffer[];
        confirmedPrices: PriceConfirmation;
      };
    savedAt: Date;
    
}

interface Segment {
    depature: {
     iataCode: string;
     at: string;
    };
    arrival: {
        iataCode: string;
        at: string;
    };
    carrierCode: string;
    number: string;
}


interface Itinerary {
    duartion: string;
    segments: Segment[];
}

interface TripCreationAttributes extends Optional<TripAttributes, 'id'> {}

export class Trip extends Model<TripAttributes, TripCreationAttributes> implements TripAttributes {
    public id!: number;
    public userId!: number;
    public searchParams!: {
        fromLocation: string;
        toLocation: string;
        departureDate: Date;
        returnDate: Date;
        adults: number;
        travelClass: string;
        maxPrice: number;
        flightOfferId: string;
        itineraries: string;
    };
    public results?: {
        initialOffers: FlightOffer[];
        confirmedPrices: PriceConfirmation;
      };
    public readonly savedAt!: Date;

  
    
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
                model: 'User',
                key: 'id'
            }
        },
        fromLocation: {
            type: DataTypes.STRING,
            allowNull: false
          },
        toLocation: {
            type: DataTypes.STRING,
            allowNull: false
          },
        departureDate: {
            type: DataTypes.STRING,
            allowNull: false
          },
        returnDate: {
            type: DataTypes.STRING,
            allowNull: false
          },
        adults: {
            type: DataTypes.INTEGER,
            value: 1,
          },
        travelClass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        maxPrice: {
            type: DataTypes.DECIMAL(10, 2)
        },
        flightOfferId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        itineraries: {
            type: DataTypes.JSON,
            allowNULL: false
        },
        results: {
            type: DataTypes.JSON
        },
        savedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
        
    },
    {
        sequelize,
        tableName: 'trips'
    }
);


return Trip;
}