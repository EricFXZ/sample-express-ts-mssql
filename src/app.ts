import express from 'express';
import teacherRoute from './core/teachers/routes/teacher-routes';
import studentsRoute from './core/students/routes/students-routes';
import careersRoute from './core/careers/routes/careers-routes';
import branchesRouter from './core/branches/routes/branches-routes';

const app = express();

app.use(express.json());
app.use(teacherRoute);
app.use(studentsRoute);
app.use(careersRoute);
app.use(branchesRouter);

export default app;