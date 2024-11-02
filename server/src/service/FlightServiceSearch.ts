import { Trip } from '../models/trip.js';
import { User } from '../models/user.js';
import sequelize from 'sequelize';
import { PriceConfirmation } from '../types/flightTypes.js';

export class TripRepository {
  async saveTrip(
    user: User,
    searchParams: {
      fromLocation: string;
      toLocation: string;
      departureDate: Date;
      returnDate: Date;
      adults: number;
      travelClass: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
      maxPrice: number;
      flightOfferId: string;
    },
    results: PriceConfirmation
  ) {
    return await Trip.create({
      userId: user.id,
      searchParams,
      results,
      savedAt: new Date(),
      itineraries: [] // Add empty array as default value for itineraries
    });
  }
  
  

  async getRecentTrips(userId: string, limit: number = 5): Promise<Trip[]> {
    return Trip.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit
    });
  }

  async getPopularRoutes(limit: number = 10): Promise<any[]> {
    return Trip.findAll({
      attributes: [
        'originLocationCode',
        'destinationLocationCode',
        [sequelize.fn('COUNT', '*'), 'search_count']
      ],
      group: ['originLocationCode', 'destinationLocationCode'],
      order: [[sequelize.fn('COUNT', '*'), 'DESC']],
      limit
    });
  }
}

