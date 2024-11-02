import { Itinerary } from '../models/trip.js';



export interface FlightSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: Date;
    returnDate: Date;
    adults: number;
    travelClass: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    maxPrice: number;
    currencyCode: string;
    flightOfferId: string[];
    itineraries: string;
    }
  

  export interface Segment {
      departure: Departure;
      arrival: Arrival;
      carrierCode: string;
  }
  
  export interface Departure {
      iataCode: string;
      terminal: string;
      at: string;
  }
  
  export interface Arrival {
      iataCode: string;
      terminal: string;
      at: string;
  }
  
  export interface Aircraft {
      code: string;
  }
  
  export interface Operating {
      carrierCode: string;
  }
  
  export interface PriceConfirmation {
    total: string;
    currency: string;
    flightOffers: FlightOffer[];
  }
  
  export interface Price {
    total: string;
    currency: string;
}

export interface FlightOffer {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: Price;
    validatingAirlineCodes: string[];
  }