import supertest from 'supertest'
import app from '../../server'

const testToken =
  'barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibS5iZWJhcnMiLCJ1c2VySWQiOiI0NTQ5MGJiZS0wMDVlLTRiNTMtYWI4Mi1hNWRiMGVhODYwNGMiLCJpYXQiOjE2NTY1OTAxMzAsImV4cCI6MTY1NjY3NjUzMH0.0ANpL8RLkmxKC2S3xiBOqdw1P8e-A9uCwVtgz-8hXzk'

describe('Controllers Testing', () => {
  describe('Users Controller', () => {
    it('Should Create a user with Route /users/register', async () => {
      const response = await supertest(app).post('/users/register').send({
        firstName: 'mahmoud',
        lastName: 'bebars',
        username: 'm.bebars',
        email: 'm.bebars@gmail.com',
        password: '12345',
        confirmPassword: '12345',
      })

      expect(response.status).toBe(200)
    })
    it('Should login the user to the accout', async () => {
      const response = await supertest(app).get('/users/login').send({
        username: 'm.bebars',
        password: '12345',
      })
      expect(response.status).toBe(200)
    })
    it('Should authorize the user', async () => {
      const response = await supertest(app)
        .get('/users/auth')
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should get a list of users after athorizing the request', async () => {
      const response = await supertest(app)
        .get('/users')
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should get user with id:1 info', async () => {
      const id = '2'
      const response = await supertest(app)
        .get('/users/' + id)
        .query(id)
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
  })
  describe('Product Controller', () => {
    it('should create a product row after authorization', async () => {
      const response = await supertest(app)
        .post('/products')
        .send({
          name: 'macbookPro',
          price: 1000,
        })
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should return products list after authorization', async () => {
      const response = await supertest(app)
        .get('/products')
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should return product with id: 2 info after authorization', async () => {
      const response = await supertest(app)
        .get('/products/' + 2)
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should update product with id: 2 price to 1200 after authorization', async () => {
      const response = await supertest(app)
        .put('/products/' + 2)
        .send({
          name: 'macbookPro',
          price: 1200,
        })
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
  })
  describe('Orders Controller', () => {
    it('should create Order row after authorization', async () => {
      const response = await supertest(app)
        .post('/orders')
        .send({
          userId: 2,
          productId: 2,
          quantity: 4,
          status: 'active',
        })
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should Update Order with id:1 status to be complete & quantity to be 2 after authorization', async () => {
      const response = await supertest(app)
        .put('/orders/' + 1)
        .send({
          userId: 2,
          productId: 6,
          quantity: 2,
          status: 'complete',
        })
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should get Orders list after authorization', async () => {
      const response = await supertest(app)
        .get('/orders')
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should get Order with id: 1 object list after authorization', async () => {
      const response = await supertest(app)
        .get('/orders/' + 1)
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
  })
  describe('Dashboard controller', () => {
    it('should return most expensive products', async () => {
      const response = await supertest(app)
        .get('/expinsiveProducts')
        .expect(200)
      expect(response.status).toBe(200)
    })
    it('should get Order with id: 1 object list after authorization', async () => {
      const response = await supertest(app)
        .get('/usersOrders/' + 1)
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
  })

  describe('Returing to Order controller', () => {
    it('should delete order with id: 1 after authorization', async () => {
      const response = await supertest(app)
        .delete('/orders/' + 2)
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
  })

  describe('Returing to Product controller', () => {
    it('should delete product with id: 1 after authorization', async () => {
      const response = await supertest(app)
        .delete('/products/' + 6)
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
  })

  describe('Returing to Users controller', () => {
    it('should delete user with id: 1 after authorization', async () => {
      const response = await supertest(app)
        .delete('/users/' + 2)
        .set('Authorization', testToken)
        .expect(200)
      expect(response.status).toBe(200)
    })
  })
})
