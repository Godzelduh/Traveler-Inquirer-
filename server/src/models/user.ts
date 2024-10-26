import {DataTypes, type Sequelize, Model, HasManyCreateAssociationMixin , type Optional} from 'sequelize';
import bcrypt from 'bcrypt';
import { Trip } from './trip';


interface UserAttributes{
    id: number;
    username: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{}


export class User
 extends Model<UserAttributes, UserCreationAttributes>
 implements UserAttributes{
    public id!: number;
    public username!: string;
    public password!: string;

    public static async hashPassword(password: string){
        return await bcrypt.hash(password, 10);
    }

    public async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }

    public static associate() {
        User.hasMany(Trip, {
            sourcekey: 'id',
            foreignKey: 'userId',
            as: 'trips'
        });
    }

    public readonly searches?: Trip[];
    public createSearch!: HasManyCreateAssociationMixin<Trip>;

}


export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'users',
            sequelize,
            hooks: {
                beforeCreate: async (user: User) => {
                    user.password = await User.hashPassword(user.password);
                },
                beforeUpdate: async (user: User) => {
                    user.password = await User.hashPassword(user.password);
                }
            }
        }
    );
    return User;
}