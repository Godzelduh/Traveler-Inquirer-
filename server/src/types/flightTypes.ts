export interface FlightSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    maxPrice?: number;
    currencyCode?: string;
  }
  
  export interface PriceConfirmation {
    flightOffers: FlightOffer[];
    bookingRequirements?: {
      invoiceAddressRequired?: boolean;
      mailboxEmailRequired?: boolean;
      phoneCountryCodeRequired?: boolean;
      postalCodeRequired?: boolean;
      travelerRequirements?: any[];
    };
  }
  
  interface FlightOffer {
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