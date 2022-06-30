import { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  }

  try {
    const createdProduct = await store.create(product)
    res.status(200).json({
      results: createdProduct,
      message: `New Product with id:${createdProduct.id} has been created succesfully`,
    })
  } catch (error) {
    res.status(400).send({ message: `error here: ${error}` })
  }
}

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.status(200).json({
      results: products,
      message: `${products.length} product has been retrived succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

const show = async (req: Request, res: Response) => {
  const id: number = +req.params.id
  try {
    const product = await store.show(id)
    res.status(200).json({
      results: product,
      message: `Product with id:${id} has been retrived succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

const update = async (req: Request, res: Response) => {
  const id: number = +req.params.id
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  }
  try {
    const updatedProduct = await store.update(id, product)
    res.status(200).json({
      results: updatedProduct,
      message: `Product with id:${id} has been updated succesfully`,
    })
  } catch (error) {
    res.status(400).send({ message: `error here: ${error}` })
    console.log(id)
  }
}

const remove = async (req: Request, res: Response) => {
  const id: number = +req.params.id
  try {
    const removedProduct = await store.delete(id)
    res.status(200).json({
      results: removedProduct,
      message: `Product with id:${id} has been removed succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

export default {
  create,
  index,
  show,
  update,
  remove,
}
