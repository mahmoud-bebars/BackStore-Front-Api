import { Application } from 'express'
import handlers from '../../controllers/service/dashboardController'
import jwt from '../../utils/jwt'

const dashboardRoutes = (app: Application) => {
  app.get('/expinsiveProducts', handlers.expinsiveProducts)
  app.get('/usersOrders/:id', jwt.verfiyToken, handlers.usersOrder)
}

export default dashboardRoutes
