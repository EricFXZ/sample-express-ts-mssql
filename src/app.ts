import express from 'express';
import cors from 'cors';
import teacherRoute from './core/teachers/routes/teacher-routes';
import studentsRoute from './core/students/routes/students-routes';
import careersRoute from './core/careers/routes/careers-routes';
import branchesRouter from './core/branches/routes/branches-routes';
import authRouter from './core/auth/routes/auth-routes';

const app = express();

app.use(cors({
    origin: 'http://localhost:54988', // Cambia el puerto según tu app Flutter Web
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(teacherRoute);
app.use(studentsRoute);
app.use(careersRoute);
app.use(branchesRouter);
app.use(authRouter)

export default app;