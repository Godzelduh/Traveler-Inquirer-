import { AmadeusService } from './amadeusService.js';
import { TripRepository } from '../service/FlightServiceSearch.js';
import { User } from '../models/user.js';
import { FlightSearchParams, FlightOffer, PriceConfirmation } from '../types/flightTypes.js';




export class TripService {
  confirmPrices(flightOffer: FlightOffer) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private amadeusService: AmadeusService,
    private tripRepository: TripRepository
  ) {}

  async searchAndPriceTrips(
    params: FlightSearchParams,
    user: User
  ): Promise<{ 
    initialOffers: FlightOffer[];
    confirmedPrices: PriceConfirmation;
    tripId: string;
  }> {
    // First, get initial flight offers
    const initialOffers = await this.amadeusService.searchFlights(params);

    // Confirm prices for the offers
    const confirmedPrices: PriceConfirmation = {
      ...await this.amadeusService.confirmPrice(initialOffers),
      total: 0, // Replace with actual total calculation
      currency: 'USD' // Replace with actual currency
    };

    // Save the search and results
    const savedTrip = await this.tripRepository.saveTrip({
      ...params,
      results: {
        initialOffers,
        confirmedPrices
      }
    }, user);

    return {
      initialOffers,
      confirmedPrices,
      tripId: savedTrip.id.toString()
    };
  }

  formatPriceComparison(confirmedPrices: PriceConfirmation) {
    return confirmedPrices.flightOffers.map(offer => ({
      id: offer.id,
      price: offer.price,
      itineraries: offer.itineraries.map(itinerary => ({
        duration: itinerary.duration,
        segments: itinerary.segments.map(segment => ({
          departure: segment.departure,
          arrival: segment.arrival,
          carrierCode: segment.carrierCode,
          number: segment.number,
          aircraft: segment.aircraft
        }))
      })),
      travelerPricings: offer.travelerPricings.map(pricing => ({
        travelerId: pricing.travelerId,
        fareOption: pricing.fareOption,
        travelerType: pricing.travelerType,
        price: pricing.price
      }))
    }));
  }
}