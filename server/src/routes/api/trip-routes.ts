import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware/AmedaMiddle.js';
import { SavedTripService } from '../../service/savedTripService.js';
import { TripService } from '../../service/tripService.js';
import { AmadeusService } from '../../service/amadeusService.js';
import { User } from '../../models/user.js';



interface AuthenticatedRequest extends Request {
    user?:{
      id: number;
      username: string;
      password: string;
    };
    body: any;
    params: any;
}




export const createTripRouter = (config: {models: any; amadeusService?: AmadeusService}) => {
  const router = Router();
  const { models, amadeusService } = config;

   new AmadeusService(
    process.env.AMADEUS_CLIENT_ID!,
    process.env.AMADEUS_CLIENT_SECRET!,
    process.env.NODE_ENV === 'production'
  );
  
  if (!amadeusService) {
    throw new Error('AmadeusService is not defined');
  }
  const tripRepository = new TripService(amadeusService, models);
  if (!amadeusService) {
    throw new Error('AmadeusService is not defined');
  }
 
  const savedTripService = new SavedTripService(tripRepository);
  
  // Save a flight
  router.post('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User not authenticated' });
      }
  
      const { searchParams, flightOffer } = req.body;
      
      const savedTrip = await savedTripService.saveTrip(
        searchParams,
        flightOffer,
        req.user as User
      );
  
      return res.json({ success: true, data: savedTrip });
    } catch (error) {
      console.error('Error saving flight:', error);
      return res.status(500).json({ success: false, error: 'Error saving flight' });
    }
  });
  
  // Get user's saved flights
  router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User not authenticated' });
      }
  
      const savedTrip = await savedTripService.getUserSavedTrips(req.user.id);
      return res.json({ success: true, data: savedTrip });
    } catch (error) {
      console.error('Error fetching saved flights:', error);
      return res.status(500).json({ success: false, error: 'Error fetching saved flights' });
    }
  });
  
  // Refresh price for a saved flight
  router.post('/:id/refresh-price', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User not authenticated' });
      }
  
      const updatedTrip = await savedTripService.refreshTripPrice(
        parseInt(req.params.id),
        req.user.id
      );
  
      if (!updatedTrip) {
        return res.status(404).json({ success: false, error: 'Saved flight not found' });
      }
  
      return res.json({ success: true, data: updatedTrip });
    } catch (error) {
      console.error('Error refreshing flight price:', error);
      return res.status(500).json({ success: false, error: 'Error refreshing flight price' });
    }
  });
  
  // Delete a saved flight
  router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User not authenticated' });
      }
  
      const deleted = await savedTripService.deleteSavedTrip(
        parseInt(req.params.id),
        req.user.id
      );
  
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Saved flight not found' });
      }
  
      return res.json({ success: true, message: 'Flight deleted successfully' });
    } catch (error) {
      console.error('Error deleting saved flight:', error);
      return res.status(500).json({ success: false, error: 'Error deleting saved flight' });
    }
  });


  return router;
}



