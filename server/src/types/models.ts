// src/types/models.ts
import { Model, Sequelize } from 'sequelize';

// Define User model interface
export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  // Add other user attributes as needed
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

// Define the Models interface
export interface Models {
    sequelize: Sequelize;
  User: typeof Model & {
    new(): UserModel;
  };
  // Add other models as needed
}