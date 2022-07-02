import { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.status(200).json({
      results: orders,
      message: `${orders.length} order has been retrived succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

const show = async (req: Request, res: Response) => {
  const id: number = +req.params.id
  try {
    const order = await store.show(id)
    res.status(200).json({
      results: order,
      message: `order with id:${id} has been retrived succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

const create = async (req: Request, res: Response) => {
  const order: Order = {
    userId: req.body.userId,
    quantity: req.body.quantity,
    status: req.body.status,
  }

  try {
    const createdOrder = await store.create(order)
    res.status(200).json({
      results: createdOrder,
      message: `New order with id:${createdOrder.orderId} has been created succesfully`,
    })
  } catch (error) {
    res.status(400).send({ message: `error here: ${error}` })
  }
}

const update = async (req: Request, res: Response) => {
  const id: number = +req.params.id
  const order: Order = {
    quantity: req.body.quantity as number,
    status: req.body.status as string,
  }
  try {
    const updatedOrder = await store.update(id, order)
    res.status(200).send(updatedOrder)
  } catch (error) {
    res.status(400).send({ message: `error here: ${error}` })
  }
}

const remove = async (req: Request, res: Response) => {
  const id: number = +req.params.id
  try {
    const removedOrder = await store.delete(id)
    res.status(200).json({
      results: removedOrder,
      message: `order with id:${id} has been removed succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}
const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export default {
  index,
  show,
  create,
  update,
  remove,
  addProduct,
}
