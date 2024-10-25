import dotenv from 'dotenv';
dotenv.config();

import { TripFactory } from '../models/trip';


class FlightService {

    private baseUrl: string;
    private apiKey: string;
    private location: string;
    constructor() {
        this.baseUrl = process.env.AMADEUS_BASE_URL || '';
        this.apiKey = process.env.AMADEUS_CLIENT_ID || '';
        this.location = '';
    }

}