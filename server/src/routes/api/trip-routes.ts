import express, { Router, Request, Response } from 'express';
import { AmadeusService } from '../../service/amadeusService.js';
import { TripService } from '../../service/tripService.js';
import { TripRepository } from '../../service/FlightServiceSearch.js';
import { DatabaseModels } from '../../models/index.js';

export function createTripRouter(models: DatabaseModels): Router {
  const router = express.Router();
  const amadeusService = new AmadeusService(
    process.env.NODE_ENV === 'production',
    process.env.AMADEUS_CLIENT_SECRET
  );
  const tripRepository = new TripRepository();
  const tripService = new TripService(amadeusService, tripRepository);

  router.get(
    '/search',
    authenticateToken,
    validateFlightSearch,
    async (req: Request & { user?: any }, res: Response) => {
      try {
        // Set the Amadeus token from the authenticated user
        amadeusService.setToken(req.user.amadeusToken);

        const searchParams: FlightSearchParams = {
          originLocationCode: req.query.from as string,
          destinationLocationCode: req.query.to as string,
          departureDate: req.query.departureDate as string,
          returnDate: req.query.returnDate as string,
          adults: parseInt(req.query.adults as string) || 1,
          travelClass: req.query.travelClass as any,
          maxPrice: parseInt(req.query.maxPrice as string),
          currencyCode: req.query.currency as string || 'USD',
          children: parseInt(req.query.children as string),
          infants: parseInt(req.query.infants as string)
        };

        const { initialOffers, confirmedPrices, tripId } = 
          await tripService.searchAndPriceTrips(searchParams, req.user);

        return res.json({
          success: true,
          data: {
            tripId,
            prices: tripService.formatPriceComparison(confirmedPrices),
            originalOffers: initialOffers
          }
        });
      } catch (error) {
        console.error('Error searching flights:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to search flights'
        });
      }
    }
  );

  return router;
}
