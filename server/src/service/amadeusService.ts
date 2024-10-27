import { URLSearchParams } from "url";
import { FlightSearchParams, PriceConfirmation } from "../types/flightTypes.js";
import { AmadeusAuthService } from "../middleware/AmedaAuth.js";

export class AmadeusService {
    private baseUrl: string;
    private clientId: string;
    private clientSecret: string;
    private token: string | null = null;
    private tokenExpiration: number = 0;
  
    constructor(
      clientId: string,
      clientSecret: string,
      isProduction: boolean = false
    ) {
      this.baseUrl = isProduction
        ? 'https://api.amadeus.com/v2'
        : 'https://test.api.amadeus.com/v2';
      this.clientId = clientId;
      this.clientSecret = clientSecret;
    }
  
    private async ensureValidToken(): Promise<string> {
      if (this.token && Date.now() < this.tokenExpiration) {
        return this.token;
      }
  
      const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });
  
      if (!tokenResponse.ok) {
        throw new Error('Failed to obtain Amadeus access token');
      }
  
      const tokenData = await tokenResponse.json();
      this.token = tokenData.access_token;
      this.tokenExpiration = Date.now() + (tokenData.expires_in * 1000);
      
      return this.token;
    }
  
    private async makeRequest(endpoint: string, method: 'GET' | 'POST', data?: any) {
      const token = await this.ensureValidToken();
      
      const options: RequestInit = {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
  
      if (data) {
        if (method === 'GET') {
          const params = new URLSearchParams(data as Record<string, string>);
          endpoint = `${endpoint}?${params.toString()}`;
        } else {
          options.body = JSON.stringify(data);
        }
      }
  
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
  
      return response.json();
    }
  
    async searchFlights(params: FlightSearchParams): Promise<FlightOffer[]> {
      const searchParams = {
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        adults: params.adults.toString(),
        travelClass: params.travelClass,
        currencyCode: params.currencyCode || 'USD',
        maxPrice: params.maxPrice?.toString()
      };
  
      const response = await this.makeRequest('/shopping/flight-offers', 'GET', searchParams);
      return response.data;
    }
  
    async confirmPrice(flightOffers: FlightOffer[]): Promise<PriceConfirmation> {
      const response = await this.makeRequest('/shopping/flight-offers/pricing', 'POST', {
        data: {
          type: 'flight-offers-pricing',
          flightOffers: flightOffers
        }
      });
      return response.data;
    }
  }


