import Database from '../database'
import { v4 as uuidv4 } from 'uuid'

export type Order = {
  id?: number
  userId?: number
  productId?: number
  orderId?: number
  quantity: number
  status: string
  msg?: string
}

export class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await Database.connect()
      const sql =
        'INSERT INTO orders (userid,productid,orderid,quantity,status) VALUES($1, $2, $3,$4,$5) RETURNING *'
      const orderId = uuidv4()
      const result = await conn.query(sql, [
        o.userId,
        o.productId,
        orderId,
        o.quantity,
        o.status,
      ])
      const order = result.rows[0]
      conn.release()
      return {
        id: order.id,
        userId: order.userid,
        productId: order.productid,
        orderId: order.orderid,
        quantity: order.quantity,
        status: order.status,
        msg: '',
      }
    } catch (err) {
      return {
        quantity: 0,
        status: '',
        msg: `Could not add order . Error: ${err}`,
      }
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM orders'
      const results = await conn.query(sql)
      const orders = results.rows
      conn.release()
      return orders
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`)
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const result = await conn.query(sql, [id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not find order with id: ${id}. Error: ${err}`)
    }
  }

  async update(id: number, o: Order): Promise<Order> {
    try {
      const conn = await Database.connect()
      const sql =
        'UPDATE orders SET status =($2),quantity=($3) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id, o.status, o.quantity])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not update order with id: ${id}. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'

      const conn = await Database.connect()

      const result = await conn.query(sql, [id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not delete order with id: ${id}. Error: ${err}`)
    }
  }
}
