import Database from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from '../utils/jwt'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const saltRounds = process.env.SALT_ROUNDS as string
const pepper = process.env.BCRYPT_PASSWORD as string

export type User = {
  id?: number
  userId?: string
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

type Response = {
  username: string
  userId: string
  accessToken: string
  errMsg?: string
}

export class UserStore {
  // GET All users in a list
  async index(): Promise<User[]> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM users'
      const results = await conn.query(sql)
      const users = results.rows
      conn.release()
      return users
    } catch (err) {
      throw new Error(`Cannot get users ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Database.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`Could not find user with id: ${id}. Error: ${err}`)
    }
  }

  // user Register function
  async register(u: User): Promise<Response> {
    try {
      const conn = await Database.connect()

      // check if email exist in the database or no to prevent duplication
      const checkEmailSql = 'SELECT * FROM users WHERE email =($1)'
      const emailCheck = await conn.query(checkEmailSql, [u.email])
      if (emailCheck.rows.length >= 1)
        return {
          username: '',
          userId: '',
          accessToken: '',
          errMsg: 'email exists, choose another one....',
        }

      // Since login contain username so it Can not be also duplicated in db so...
      // we check if emal exist in the database or no
      const checkUsernameSql = 'SELECT * FROM users WHERE username =($1)'
      const usernameCheck = await conn.query(checkUsernameSql, [u.username])
      if (usernameCheck.rows.length >= 1)
        return {
          username: '',
          userId: '',
          accessToken: '',
          errMsg: 'username exists, choose another one....',
        }

      // compare passwords & create hashed password
      if (u.password !== u.confirmPassword)
        return {
          username: '',
          userId: '',
          accessToken: '',
          errMsg: 'Passwords Doesn not Match, try Again...',
        }
      const hash = bcrypt.hashSync(
        u.password + (pepper as string),
        parseInt(saltRounds as string)
      )
      // create uniqe id for the user
      const userId = uuidv4()

      // record user info in the database
      const insertSql =
        'INSERT INTO users (userid,firstName,lastName,username,email,password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
      const result = await conn.query(insertSql, [
        userId,
        u.firstName,
        u.lastName,
        u.username,
        u.email,
        hash,
      ])
      const user = result.rows[0]
      conn.release()

      // generate access token for the user Authorization
      const accessToken = jwt.generateToken(user.username, user.userId)
      // create the function success response
      const response = {
        userId: user.userid as string,
        username: user.username as string,
        accessToken: accessToken as string,
      }

      return response
    } catch (err) {
      // catch any Errors
      throw new Error(
        `Could not Register the user with name ${u.username}. Error: ${err}`
      )
    }
  }

  // user Login function
  async login(username: string, password: string): Promise<Response> {
    try {
      const conn = await Database.connect()
      // check username exists or no
      const sql = 'SELECT * FROM users WHERE username=($1)'

      const result = await conn.query(sql, [username])
      // check of username existance
      if (result.rows.length) {
        const user = result.rows[0]
        // compare password with hashed one in the db
        if (bcrypt.compareSync(password + pepper, user.password)) {
          // generate access token for the user Authorization
          const accessToken = jwt.generateToken(user.username, user.userid)

          // create the success response
          const response = {
            username: username,
            userId: user.userid,
            accessToken: accessToken,
          }
          return response
        }
      }
      // return errors when username/password is not correct
      return {
        username: '',
        userId: '',
        accessToken: '',
        errMsg: 'username/password is not correct... try again',
      }
    } catch (err) {
      // catch any Errors
      return {
        username: '',
        userId: '',
        accessToken: '',
        errMsg: `Could not Login user to the account due to Error: ${err}`,
      }
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'

      const conn = await Database.connect()

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete user with id: ${id}. Error: ${err}`)
    }
  }
}
