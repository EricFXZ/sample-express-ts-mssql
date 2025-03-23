import { Request, Response } from "express";
import { database } from "../../../config/database";
import sql from "mssql";

export const listTeachers = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.query('SELECT * FROM DOCENTE');
        await pool.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        res.json(error);
    }
};

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();

        const checkDNI = await pool.request()
            .input("DNI", sql.VarChar, req.body.Dni)
            .query('SELECT CodigoDocente FROM DOCENTE WHERE DNI = @DNI;');

        if (checkDNI.recordset.length > 0) {
            return res.status(400).json({ message: 'DNI Already Exist' });
        }

        const insertRegister = await pool.request()
            .input('Pass', sql.VarChar, req.body.Pass)
            .input('Rol', sql.VarChar, 'Docente')
            .query("INSERT INTO Registro (Pass, Rol) OUTPUT INSERTED.NmCuenta VALUES (@Pass, @Rol)");

        const registerId = insertRegister.recordset[0].NmCuenta;

        const result = await pool.request()
            .input("DNI", sql.VarChar, req.body.Dni)
            .input("P_Nombre", sql.VarChar, req.body.P_Nombre)
            .input("S_Nombre", sql.VarChar, req.body.S_Nombre)
            .input("P_Apellido", sql.VarChar, req.body.P_Apellido)
            .input("S_Apellido", sql.VarChar, req.body.S_Apellido)
            .input("Telefono", sql.VarChar, req.body.Telefono)
            .input("Salario", sql.Float, req.body.Salario)
            .input("CodigoSucursal", sql.Int, req.body.CodigoSucursal)
            .input("NmCuenta", sql.Int, registerId)
            .query(`INSERT INTO DOCENTE (DNI, P_Nombre, S_Nombre, P_Apellido, S_Apellido, 
                Telefono, CodigoSucursal, NmCuenta, Salario) VALUES (@DNI, @P_Nombre, @S_Nombre, 
                @P_Apellido, @S_Apellido, @Telefono, @CodigoSucursal, @NmCuenta, @Salario)`);

        await pool.close();
        res.status(201).json({ message: 'Teacher created succesfully' })


    } catch (error) {
        res.json(error)
    }
}

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const pool = await database.connect();
        const result = await pool.request()
            .input("CodigoDocente", sql.Int, req.params.codigoDocente)
            .input("P_Nombre", sql.VarChar, req.body.P_Nombre)
            .input("S_Nombre", sql.VarChar, req.body.S_Nombre)
            .input("P_Apellido", sql.VarChar, req.body.P_Apellido)
            .input("S_Apellido", sql.VarChar, req.body.S_Apellido)
            .input("Telefono", sql.VarChar, req.body.Telefono)
            .input("Salario", sql.Float, req.body.Salario)
            .input("CodigoSucursal", sql.Int, req.body.CodigoSucursal)
            .query(`UPDATE DOCENTE SET DNI = @DNI, P_Nombre = @P_Nombre, 
                S_Nombre = @S_Nombre, P_Apellido = @P_Apellido, S_Apellido = @S_Apellido,
                Telefono = @Telefono, Salario = @Salario, CodigoSucursal = @CodigoSucursal 
                WHERE CodigoDocete = @CodigoDocente;`);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: ' Teacher not found' });
        }
        await pool.close();
        res.status(200).json({ message: 'Branch updated succesfully' });

    } catch (error) {
        res.json(error);
    }
}