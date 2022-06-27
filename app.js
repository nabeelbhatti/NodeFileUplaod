import express, { urlencoded } from 'express'
import fileRoutes from './routes/fileRouter.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/api/v1/file', fileRoutes)
app.use('/api/v1/user', userRoutes)


export default app

