import { Application } from 'express'
import handlers from '../controllers/orderController'
import jwt from '../utils/jwt'

const ordersRoute = (app: Application) => {
  app.post('/orders', jwt.verfiyToken, handlers.create)
  app.put('/orders/:id', jwt.verfiyToken, handlers.update)
  app.delete('/orders/:id', jwt.verfiyToken, handlers.remove)
  app.get('/orders', jwt.verfiyToken, handlers.index)
  app.get('/orders/:id', jwt.verfiyToken, handlers.show)
}

export default ordersRoute
