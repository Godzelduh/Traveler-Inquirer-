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
    iiineraries: string[];
  }
  
  export interface PriceConfirmation {
    total: number;
    currency: string;
    flightOffers: FlightOffer[];
    bookingRequirements?: {
      invoiceAddressRequired?: boolean;
      mailboxEmailRequired?: boolean;
      phoneCountryCodeRequired?: boolean;
      postalCodeRequired?: boolean;
      travelerRequirements?: any[];
    };
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
    pricingOptions: PricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
  }