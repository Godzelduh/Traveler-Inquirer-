import {DataTypes, type Sequelize, Model, type Optional} from 'sequelize';




interface PriceConfirmation {
    total: number;
    currency: string;
}

interface Itinerary {

}

interface FlightOffer{
    type: string;
    id: string;
    lastTicketingDate: string;
    source:string[];
    itineraries: Itinerary[];
    numberOfBookableSeats: number;

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
                model: 'users',
                key: 'id'
            }
        },
        searchParams: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        },
        results: {
            type: DataTypes.JSON,
            allowNull: true
        },
        savedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        Segment: {
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