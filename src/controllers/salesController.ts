import { Request, Response } from 'express';
import { IsNull, Not } from 'typeorm';
import database from '../config/database';
import { VehicleListTM } from '../models/Vehicle/VehicleList';

export const getPerformance = async (req: Request, res: Response) => {
  try {
    const vehicle = database.getRepository(VehicleListTM);
    const firstVehicle = await vehicle.findOne({
      where: {
        STNKDate: Not(IsNull()), // Use Not and IsNull from TypeORM
      },
    });

    res.json({
      message: 'Hi im getPerformance method on controller',
      vehicle: firstVehicle,
    });
  } catch (error) {
    res.json(error);
  }
};
