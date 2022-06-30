import Database from '../../database'
import { Product } from '../product'
import { Order } from '../orders'

export class DashboardQueries {
  // GET most 5 expinsave Products
  async expinsiveProducts(): Promise<Product[]> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5'
      const results = await conn.query(sql)
      const products = results.rows
      conn.release()
      return products
    } catch (err) {
      throw new Error(`Cannot get products ${err}`)
    }
  }
  async usersOrders(userId: Order['userId']): Promise<Order[]> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM orders WHERE userid= ($1)'
      const results = await conn.query(sql, [userId])
      const orders = results.rows
      conn.release()
      return orders
    } catch (err) {
      throw new Error(`Cannot get orders for user with id:${userId} ${err}`)
    }
  }
}
