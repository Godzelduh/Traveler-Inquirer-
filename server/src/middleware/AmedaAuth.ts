import {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { JWTPayload } from './AmedaMiddle';

export interface AmadeusConfig{
    clientID: string;
    clientSecret: string;
    jwtSecret: string;
    isProduction: boolean;
   
}

interface TokenResponse{
    token: string;
    expiresIn: number;
}

export class AmadeusAuthService{
    private readonly baseURL: string;

    constructor(private config: AmadeusConfig) {
        this.baseURL = config.isProduction 
          ? 'https://api.amadeus.com'
          : 'https://test.api.amadeus.com';
      }
    
      private async getAmadeusToken(): Promise<string | null> {
        try {
          const params = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: this.config.clientID,
            client_secret: this.config.clientSecret,
          });
    
          const response = await fetch(
            `${this.baseURL}/v1/security/oauth2/token`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: params
            }
          );
    
          if (!response.ok) {
            throw new Error(`Amadeus API error: ${response.statusText}`);
          }
    
          const data = await response.json();
          return data.access_token;
        } catch (error) {
          console.error('Failed to get Amadeus token:', error);
          return null;
        }
      }
    
      async generateJWT(): Promise<TokenResponse | null> {
        const amadeusToken = await this.getAmadeusToken();
        
        if (!amadeusToken) {
          return null;
        }
    
        const expiresIn = 3600; // 1 hour
        const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
          amadeusToken
        };
    
        const token = jwt.sign(
          payload,
          this.config.jwtSecret,
          { expiresIn }
        );
    
        return {
          token,
          expiresIn
        };
      }
    
      getAmadeusAuthHeader(token: string): { Authorization: string } {
        return { Authorization: `Bearer ${token}` };
      }
    }