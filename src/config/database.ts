import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { VehicleListTM } from '../models/Vehicle/VehicleList';
dotenv.config();

const database = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [VehicleListTM],
  extra: {
    encrypt: false,
  },
});

export default database;
