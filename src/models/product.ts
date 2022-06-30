import Database from '../database'
import { v4 as uuidv4 } from 'uuid'

export type Product = {
  id?: number
  productId?: string
  name: string
  price: number
  msg?: string
}
export class ProductStore {
  async create(p: Product): Promise<Product> {
    try {
      const conn = await Database.connect()
      const sql =
        'INSERT INTO products (productid,name,price) VALUES($1, $2, $3) RETURNING *'
      const productId = uuidv4()
      const result = await conn.query(sql, [productId, p.name, p.price])
      const product = result.rows[0]
      conn.release()
      return {
        id: product.id,
        productId: product.productid,
        name: product.name,
        price: product.price,
        msg: '',
      }
    } catch (err) {
      return {
        productId: '',
        name: '',
        price: 0,
        msg: `Could not add product with name ${p.name}. Error: ${err}`,
      }
    }
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM products'
      const results = await conn.query(sql)
      const products = results.rows
      conn.release()
      return products
    } catch (err) {
      throw new Error(`Cannot get products ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not find product with id: ${id}. Error: ${err}`)
    }
  }

  async update(id: number, p: Product): Promise<Product> {
    try {
      const conn = await Database.connect()
      const sql =
        'UPDATE products SET  name=($2),price=($3) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id, p.name, p.price])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not update product with id: ${id}. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'

      const conn = await Database.connect()

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete product with id: ${id}. Error: ${err}`)
    }
  }
}
