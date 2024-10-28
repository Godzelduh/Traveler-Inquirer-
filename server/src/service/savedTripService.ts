import { Trip } from "../models/trip";
import { TripService } from "../service/tripService";
import { User } from "../models/user";
import { FlightSearchParams, FlightOffer, PriceConfirmation } from "../types/flightTypes";



export class SavedTripService {
    constructor(
        private tripService: TripService
    ) {}

    async saveTrip(
        searchParams: FlightSearchParams,
        flightOffer: FlightOffer,
        user: User
    ): Promise<Trip> {
      const confirmedPrice = await this.tripService.confirmPrice(flightOffer);


      return await Trip.create({
        userId: user.id,
        searchParams,
        flightOffer,
        priceConfirmation: confirmedPrice,
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
        const savedTrip = await savedTrip.findOne({
            where: {id: savedFlightId, userId},
        });

        if(!savedTrip) {
            return null;
        }

        const confirmedPrice = await this.tripService.confirmPrice(savedTrip.flightOffer);

        await savedTrip.update({priceConfirmation: confirmedPrice});
    }
}
