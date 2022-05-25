import express from 'express'
import router from './routes/fileRouter.js'

const app = express()


app.use('/api/v1/file', router)


export default app

