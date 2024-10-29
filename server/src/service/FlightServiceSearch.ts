import { Trip } from '../models/trip.js';
import { User } from '../models/user.js';
import sequelize from 'sequelize';

export class TripRepository {
  async saveTrip(tripData: Partial<Trip>, user: User): Promise<Trip> {
    return Trip.create({
      ...tripData,
      userId: user.id
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

