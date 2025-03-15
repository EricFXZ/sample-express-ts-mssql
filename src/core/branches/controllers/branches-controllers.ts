import { Request, Response } from "express";
import { database } from "../../../config/database";
import sql from "mssql";

export const listBranches = async (req: Request, res: Response) => {

    try {
        const pool = await database.connect();
        const result = await pool.query('SELECT * FROM SUCURSAL;');
        await pool.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        res.json(error)
    }
}

export const createBranch = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.request()
            .input('Nombre', sql.VarChar, req.body.Nombre)
            .input('Departamento', sql.VarChar, req.body.Departamento)
            .input('Ciudad', sql.VarChar, req.body.Ciudad)
            .input('Calle', sql.VarChar, req.body.Calle)
            .query(`INSERT INTO SUCURSAL (Nombre, Departamento, Ciudad, Calle)
                    VALUES (@Nombre, @Departamento, @Ciudad, @Calle);
                `);
        res.status(201).json({ message: 'Branch created succesfully' })
    } catch (error) {
        res.json(error);
    }
}

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.request()
            .input('CodigoSucursal', sql.Int, req.body.CodigoSucursal)
            .input('Nombre', sql.VarChar, req.body.Nombre)
            .input('Departamento', sql.VarChar, req.body.Departamento)
            .input('Ciudad', sql.VarChar, req.body.Ciudad)
            .input('Calle', sql.VarChar, req.body.Calle)
            .query(`UPDATE SUCURSAL SET Nombre = @Nombre, Departamento = @Departamento, 
                Ciudad = @Ciudad, Calle = @Calle WHERE CodigoSucursal = @CodigoSucursal;`);
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({message:' Branch not found'});
        }
        res.status(200).json({ message: 'Branch updated succesfully' });

    } catch (error) {
        res.json(error);
    }
}