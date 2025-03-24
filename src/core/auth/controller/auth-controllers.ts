import { Request, Response } from "express";
import { database } from "../../../config/database";
import sql from "mssql";

export const signIn = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.request()
            .input('NmCuenta', sql.Int, req.body.NmCuenta)
            .input('Pass', sql.VarChar, req.body.Pass)
            .query('SELECT * FROM REGISTRO WHERE NmCuenta = @NmCuenta AND Pass = @Pass;')

        if (result.recordset.length === 0) {
            await pool.close();
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const role = result.recordset[0].Rol;
        let user;

        if (role === 'Admin') {
            user = result;
        }else if ( role === 'Alumno'){
            user = await pool.request()
                .input('NmCuenta',sql.Int, req.body.NmCuenta)
                .query('SELECT * FROM Alumno WHERE NmCuenta = @NmCuenta;');
        } else if ( role === 'Docente'){
            user = await pool.request()
                .input('NmCuenta',sql.Int, req.body.NmCuenta)
                .query('SELECT * FROM Alumno WHERE NmCuenta = @NmCuenta;');
        } else{
            await pool.close();
            return res.status(403).json({message: 'Invalid role'});
        }

        await pool.close();

        res.status(200).json({
            role:role,
            user: user.recordset[0]
        })
    

    } catch (error) {
        res.json(error);
    }
}