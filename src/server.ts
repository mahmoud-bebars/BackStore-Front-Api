import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import usersRoute from './routes/usersRoutes'
import productsRoutes from './routes/productsRoutes'
import dashboardRoutes from './routes/services/dashboardRoutes'
import ordersRoute from './routes/ordersRoutes'

const app: Application = express()
const address: string = '0.0.0.0:5000'

// Dotenv config
dotenv.config()

const { PORT, ENV } = process.env

// CORS configration options
const corsOptions = {
  origin: '*',
  optionsSucessStatus: 200,
}

// CORS middleware
app.use(cors(corsOptions))

// HTTP request logger middleware
app.use(morgan('dev'))

//Json Body Parser middleware
app.use(express.json())

console.log(
  `Working on The ${ENV === 'dev' ? '💿' : '🧪'} ${
    ENV === 'dev' ? 'Development' : 'Testing'
  } Databse Environment`
)

usersRoute(app)

productsRoutes(app)
ordersRoute(app)

dashboardRoutes(app)

app.listen(PORT, function () {
  console.log(`🚀 Server is Up & running on Port:${PORT} at: ${address}`)
})

export default app
