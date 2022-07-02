import { UserStore } from '../../models/users'
import { ProductStore } from '../../models/product'
import { OrderStore } from '../../models/orders'
import { DashboardQueries } from '../../models/services/dashboard'

const userStoreTest = new UserStore()
const productStoreTest = new ProductStore()
const orderStoreTest = new OrderStore()
const DashboardQueriesTest = new DashboardQueries()

describe('Models Testing', () => {
  describe('User Model', () => {
    it('shoud Register a new user to the appliction', async () => {
      const user = {
        firstName: 'mahmoud',
        lastName: 'bebars',
        username: 'mbebars',
        email: 'm.bebars@icloud.com',
        password: '12345',
        confirmPassword: '12345',
      }
      const results = await userStoreTest.register(user)
      expect(results.userId).toBeDefined()
      expect(results.username).toEqual('mbebars')
      expect(results.accessToken).toBeDefined()
    })
    it('should fail because email exists', async () => {
      const user = {
        firstName: 'mahmoud',
        lastName: 'bebars',
        username: 'mbebar',
        email: 'm.bebars@icloud.com',
        password: '12345',
        confirmPassword: '12345',
      }
      const results = await userStoreTest.register(user)
      expect(results.errMsg).toEqual('email exists, choose another one....')
    })
    it('should fail because username exists', async () => {
      const user = {
        firstName: 'mahmoud',
        lastName: 'bebars',
        username: 'mbebars',
        email: 'm.bebars1998@icloud.com',
        password: '12345',
        confirmPassword: '12345',
      }
      const results = await userStoreTest.register(user)
      expect(results.errMsg).toEqual('username exists, choose another one....')
    })
    it('should login the user to his account', async () => {
      const username = 'mbebars'
      const password = '12345'
      const results = await userStoreTest.login(username, password)
      expect(results.accessToken).toBeDefined()
    })
    it('should return list of users after authorize the request', async () => {
      const result = await userStoreTest.index()
      expect(result[0].id).toEqual(1)
    })
    it('shoud return the user with id: 1 information', async () => {
      const result = await userStoreTest.show(1)
      expect(result.id).toEqual(1)
      expect(result.username).toEqual('mbebars')
    })
  })

  describe('Product Model', () => {
    it('should create a product row in database', async () => {
      const product = {
        name: 'macbookPro',
        price: 1000,
      }
      const results = await productStoreTest.create(product)
      expect(results.productId).toBeDefined()
      expect(results.name).toEqual('macbookPro')
    })
    it('should retive a products list', async () => {
      const result = await productStoreTest.index()
      expect(result.length).toEqual(1)
    })
    it('should retive a product with id:1 information', async () => {
      const result = await productStoreTest.show(1)
      expect(result.id).toEqual(1)
      expect(result.name).toEqual('macbookPro')
    })
    it('should retive a products list', async () => {
      const result = await productStoreTest.index()
      expect(result[0].id).toEqual(1)
    })
    it('should update a product price with id:1 ', async () => {
      const product = {
        name: 'macbookPro',
        price: 1200,
      }
      const results = await productStoreTest.update(1, product)
      expect(+results.price).toEqual(1200)
    })
  })

  describe('Orders Model', () => {
    it('should create a order row in database', async () => {
      const order = {
        userId: 1,
        quantity: 3,
        status: 'active',
      }
      const results = await orderStoreTest.create(order)
      expect(results.orderId).toBeDefined()
      expect(results.quantity).toEqual(3)
    })
    it('should retive a orders list', async () => {
      const result = await orderStoreTest.index()
      expect(result.length).toEqual(1)
    })
    it('should retive a order with id:1 information', async () => {
      const result = await orderStoreTest.show(1)
      expect(result.id).toEqual(1)
      expect(result.quantity).toBe(3)
    })
    it('should retive a orders list', async () => {
      const result = await orderStoreTest.index()
      expect(result[0].id).toEqual(1)
    })
    it('should update a order with id:1 quantity to be 5 ', async () => {
      const product = {
        quantity: 5,
        status: 'active',
      }
      const results = await orderStoreTest.update(1, product)
      expect(+results.quantity).toEqual(5)
    })
    it('should update a order status  with id:1  to be completed', async () => {
      const product = {
        quantity: 5,
        status: 'completed',
      }
      const results = await orderStoreTest.update(1, product)
      expect(results.status).toEqual('completed')
    })
  })

  describe('Dashboard controller', () => {
    it('should return most expensive products', async () => {
      const product1 = {
        name: 'macbookPro',
        price: 1500,
      }
      const product2 = {
        name: 'macbookPro',
        price: 1300,
      }
      const product3 = {
        name: 'macbookPro',
        price: 1200,
      }

      await productStoreTest.create(product1)
      await productStoreTest.create(product2)
      await productStoreTest.create(product3)

      const results = await DashboardQueriesTest.expinsiveProducts()

      expect(results.length).toEqual(4)
      expect(results[0].price).toEqual(1500)
      expect(results[3].price).toEqual(1200)
    })
    it('should get Order with id: 1 object list after authorization', async () => {
      const results = await DashboardQueriesTest.usersOrders(1)

      expect(results[0].id).toEqual(1)
    })
  })

  describe('Returning to Orders Model', () => {
    it('should remove order row with id:1 ', async () => {
      const results = await orderStoreTest.delete(1)
      expect(results.id).toEqual(1)
    })
  })
  describe('Returning to Product Model', () => {
    it('should remove a product row with id:1 ', async () => {
      const results = await productStoreTest.delete(1)
      expect(results.id).toEqual(1)
    })
  })
  describe('Returning to Users Model', () => {
    it('should remove user with id:1 ', async () => {
      await userStoreTest.delete(2)
      await userStoreTest.delete(3)
      await userStoreTest.delete(4)
      const results = await userStoreTest.delete(1)
      expect(results.id).toEqual(1)
    })
  })
})
