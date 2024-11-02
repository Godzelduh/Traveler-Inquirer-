import {DataTypes, type Sequelize, Model, type Optional} from 'sequelize';
import { PriceConfirmation,} from '../types/flightTypes';





export interface Itinerary {
    duration: string;
    departure: {
      iataCode: string;
      at: string;
    };
    arrival: {
      iataCode: string;
      at: string;
    };
    carrierCode: string;
    number: string;
    aircraft: {
      code: string;
    };
  }
  


  interface TripAttributes {
    id: number;
    userId: number;
    searchParams: {
        fromLocation: string;
        toLocation: string;
        departureDate: Date;
        returnDate: Date;
        adults: number;
        travelClass: string;
        maxPrice: number;
        flightOfferId: string;  
    };
    results: PriceConfirmation;
    savedAt: Date;
    itineraries?: Itinerary[];
    }






interface TripCreationAttributes extends Optional<TripAttributes, 'id'> {}

export class Trip extends Model<TripAttributes, TripCreationAttributes> implements TripAttributes {
    flightOffer() {
      throw new Error("Method not implemented.");
    }
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
        
    };
    public itineraries?: Itinerary[];
    public results!: PriceConfirmation;
    public readonly savedAt!: Date;
   
      
    constructor(init?: Partial<TripAttributes>) {
        super();
        Object.assign(this, init);
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
        searchParams: {
            type: DataTypes.JSON,
            defaultValue: {
                fromLocation: '',
                toLocation: '',
                departureDate: new Date(),
                returnDate: new Date(),
                adults: 1,
                travelClass: 'ECONOMY',
                maxPrice: 0,
                flightOfferId: ''
            }
        },
        results: {
            type: DataTypes.STRING,
            allowNull: true
        },
        savedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        itineraries: {
            type: DataTypes.JSON,
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