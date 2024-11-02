import { AmadeusService } from './amadeusService.js';
import { TripRepository } from '../service/FlightServiceSearch.js';
import { User } from '../models/user.js';
import { FlightSearchParams, FlightOffer, PriceConfirmation } from '../types/flightTypes.js';
import { Trip } from '../models/trip.js';




export class TripService {
  constructor(
    private amadeusService: AmadeusService,
    private tripRepository: TripRepository
  ) {}

  // Update the confirmPrices method to return PriceConfirmation
  async confirmPrices(flightOffer: Trip): Promise<PriceConfirmation> {
    try {
      // Assuming you're using the flight offer ID to confirm prices
      const flightOfferId = flightOffer.searchParams.flightOfferId;
      
      // Use AmadeusService to get the confirmed price
      const confirmedPrice = await this.amadeusService.confirmPrice([{
        id: flightOfferId,
        type: '',
        source: '',
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: '',
        numberOfBookableSeats: 0,
        itineraries: [{
          duration: '',
            departure: {
              iataCode: '',
              at: ''
            },
            arrival: {
              iataCode: '',
              at: ''
            },
            carrierCode: '',
            number: '',
            aircraft: {
              code: ''
            }
          
        }],
        price: {
          total: '0',
          currency: 'USD'
        },
        validatingAirlineCodes: []
      }]);

      return {
        total: confirmedPrice.total || '0',
        currency: confirmedPrice.currency || 'USD',
        flightOffers: [{
          id: flightOffer.searchParams.flightOfferId,
          type: '',
          source: '',
          instantTicketingRequired: false,
          nonHomogeneous: false,
          oneWay: false,
          lastTicketingDate: '',
          numberOfBookableSeats: 0,
          itineraries: flightOffer.itineraries ? flightOffer.itineraries.map(itinerary => ({
            duration: itinerary.duration,
            departure: itinerary.departure,
            arrival: itinerary.arrival,
            carrierCode: itinerary.carrierCode,
            number: itinerary.number,
            aircraft: itinerary.aircraft
          })) : [],
          price: flightOffer.results,
          validatingAirlineCodes: []
        }]
      };
    } catch (error) {
      // Handle error appropriately
      if (error instanceof Error) {
        throw new Error(`Failed to confirm prices: ${error.message}`);
      } else {
        throw new Error('Failed to confirm prices: Unknown error');
      }
    }
  }

  // Rest of the TripService class remains the same
  async searchAndPriceTrips(
    params: FlightSearchParams,
    user: User
  ): Promise<{ 
    initialOffers: FlightOffer[];
    confirmedPrices: PriceConfirmation;
    tripId: string;
  }> {
    const initialOffers = await this.amadeusService.searchFlights(params);
    const confirmedPrices = await this.amadeusService.confirmPrice(initialOffers);

    const tripData = new Trip({
      searchParams: {
        fromLocation: params.originLocationCode,
        toLocation: params.destinationLocationCode,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        adults: params.adults,
        travelClass: params.travelClass,
        maxPrice: params.maxPrice || 0,
        flightOfferId: initialOffers[0]?.id || ''
      },
      results: confirmedPrices,
      itineraries: initialOffers[0]?.itineraries || [],

    });

    const savedTrip = await this.tripRepository.saveTrip(tripData, user, );

    return {
      initialOffers,
      confirmedPrices,
      tripId: savedTrip.id.toString()
    };
  }

  formatPriceComparison(confirmedPrices: PriceConfirmation): { id: string;  itineraries: any[] }[] {
    return confirmedPrices.flightOffers.map(offer => ({
      id: offer.id,
      price: offer.price,
      itineraries: Array.isArray(offer.itineraries) ? offer.itineraries.map(itinerary => ({
        duration: itinerary.duration,
        departure: itinerary.departure,
        arrival: itinerary.arrival,
        carrierCode: itinerary.carrierCode,
        number: itinerary.number,
        aircraft: itinerary.aircraft
      })) : []
    }));
  }
}