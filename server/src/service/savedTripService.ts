import { Trip} from "../models/trip.js";
import { TripService } from "../service/tripService.js";
import { User } from "../models/user.js";
import { FlightSearchParams  } from "../types/flightTypes.js";



export class SavedTripService {
    constructor(
        private tripService: TripService
    ) {}

    async saveTrip(
        searchParams: FlightSearchParams,
        flightOffer: Trip,
        user: User
    ): Promise<Trip> {
      const confirmedPrice = await this.tripService.confirmPrices(flightOffer);


      return await Trip.create({
        userId: user.id,
        searchParams: {
          fromLocation: searchParams.originLocationCode,
          toLocation: searchParams.destinationLocationCode,
          departureDate: searchParams.departureDate,
          returnDate: searchParams.returnDate,
          adults: searchParams.adults,
          travelClass: searchParams.travelClass,
          maxPrice: searchParams.maxPrice,
          flightOfferId: searchParams.flightOfferId.join(', '),
  
        },
        results: confirmedPrice,
        savedAt: new Date(),
      });
    }

    async getUserSavedTrips(userId: number): Promise<Trip[]> {
      return await Trip.findAll({
        where: {userId},
        order: [['savedAt', 'DESC']],
      });
    }

    async deleteSavedTrip(id: number, userId: number): Promise<boolean>{
        const deleted = await Trip.destroy({
            where: {id, userId}
        });
        return deleted > 0;
    }

    async refreshTripPrice(savedFlightId: number, userId: number): Promise<Trip | null> {
        const savedTrip = await Trip.findOne({
            where: {id: savedFlightId, userId},
        });

        if(!savedTrip) {
            return null;
        }

        const confirmedPrice = await this.tripService.confirmPrices(savedTrip);

        await savedTrip.update({results: confirmedPrice});
        return savedTrip;
    }
}
