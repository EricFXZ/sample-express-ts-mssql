import { Request, Response } from "express";
import { database } from "../../../config/database";

export const listCareers = async (req:Request, res:Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.query('SELECT * FROM CARRERA');
        await pool.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        res.json(error);
    }
}