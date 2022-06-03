import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mountRoutes from './routes'

dotenv.config();

const app = express()
const port = 3000

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))

app.use(express.json())

mountRoutes(app)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})