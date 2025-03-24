import { Request, Response } from "express";
import { database } from "../../../config/database";
import sql from "mssql";

export const listStudents = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.query('SELECT * FROM ALUMNO');
        await pool.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        res.json(error)
    }
}

export const createStudent = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const checkDNI = await pool.request()
            .input("DNI", sql.VarChar, req.body.Dni)
            .query('SELECT CodigoAlumno FROM ALUMNO WHERE DNI = @DNI;');

        if (checkDNI.recordset.length > 0) {
            await pool.close();
            return res.status(400).json({ message: 'DNI Already Exist' });
        }

        const insertRegister = await pool.request()
            .input('Pass', sql.VarChar, req.body.Pass)
            .input('Rol', sql.VarChar, 'Alumno')
            .query("INSERT INTO Registro (Pass, Rol) OUTPUT INSERTED.NmCuenta VALUES (@Pass, @Rol)");

        const registerId = insertRegister.recordset[0].NmCuenta;

        const result = await pool.request()
            .input("DNI", sql.VarChar, req.body.Dni)
            .input("P_Nombre", sql.VarChar, req.body.P_Nombre)
            .input("S_Nombre", sql.VarChar, req.body.S_Nombre)
            .input("P_Apellido", sql.VarChar, req.body.P_Apellido)
            .input("S_Apellido", sql.VarChar, req.body.S_Apellido)
            .input("Telefono", sql.VarChar, req.body.Telefono)
            .input("CodigoSucursal", sql.Int, req.body.CodigoSucursal)
            .input("NmCuenta", sql.Int, registerId)
            .query(`INSERT INTO ALUMNO (DNI, P_Nombre, S_Nombre, P_Apellido, S_Apellido, Telefono, CodigoSucursal, NmCuenta) VALUES 
                (@DNI, @P_Nombre, @S_Nombre, @P_Apellido, @S_Apellido, @Telefono, @CodigoSucursal, @NmCuenta)`);

        await pool.close();
        res.status(201).json({ message: 'Student created succesfully' })
    } catch (error) {
        res.json(error);
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.request()
            .input("CodigoAlumno", sql.Int, req.params.codigoAlumno)
            .input("P_Nombre", sql.VarChar, req.body.P_Nombre)
            .input("S_Nombre", sql.VarChar, req.body.S_Nombre)
            .input("P_Apellido", sql.VarChar, req.body.P_Apellido)
            .input("S_Apellido", sql.VarChar, req.body.S_Apellido)
            .input("Telefono", sql.VarChar, req.body.Telefono)
            .input("CodigoSucursal", sql.Int, req.body.CodigoSucursal)
            .query(`UPDATE ALUMNO SET P_Nombre = @P_Nombre, S_Nombre = @S_Nombre, P_Apellido = @P_Apellido,
                S_Apellido = @S_Apellido, Telefono = @Telefono, CodigoSucursal = @CodigoSucursal WHERE CodigoAlumno = @CodigoAlumno`);

        await pool.close();
        if (result.rowsAffected[0] === 0) {
            await pool.close();
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated succesfully' });
    } catch (error) {
        res.json(error);
    }
}