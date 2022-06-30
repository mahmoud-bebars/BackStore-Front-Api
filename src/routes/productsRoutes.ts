import { Application } from 'express'
import handlers from '../controllers/productController'
import jwt from '../utils/jwt'

const productsRoute = (app: Application) => {
  app.post('/products', jwt.verfiyToken, handlers.create)
  app.put('/products/:id', jwt.verfiyToken, handlers.update)
  app.delete('/products/:id', jwt.verfiyToken, handlers.remove)
  app.get('/products', handlers.index)
  app.get('/products/:id', handlers.show)
}

export default productsRoute
