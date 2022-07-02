import { Request, Response } from 'express'
import { DashboardQueries } from '../../models/services/dashboard'

const dashboard = new DashboardQueries()

const expinsiveProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.expinsiveProducts()
    res.status(200).json({
      results: products,
      message: `Most expinsive ${products.length} product has been retrived succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

const usersOrder = async (req: Request, res: Response) => {
  const userId: number = +req.params.id
  try {
    const orders = await dashboard.usersOrders(userId)
    res.status(200).json({
      results: orders,
      message: `${orders.length} order has been retrived succesfully for user with id: ${userId}`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}
const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders()
  res.json(products)
}

export default {
  expinsiveProducts,
  usersOrder,
  productsInOrders,
}
