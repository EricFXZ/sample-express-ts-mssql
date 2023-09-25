import { Request, Response } from 'express';
import { database } from '../config/database';

export const getPerformance = async (req: Request, res: Response) => {
  try {
    if (!database.connected) {
      await database.connect();
    }

    const result = await database.query('SELECT TOP 5 * FROM CVehicle_List_TM');
    await database.close();

    res.json({
      message: 'Hi im getPerformance method on controller',
      result: result.recordset,
    });
  } catch (error) {
    res.json(error);
  }
};
