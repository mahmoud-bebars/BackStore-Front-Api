import { Request, Response, NextFunction } from 'express'
import { User, UserStore } from '../models/users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const store = new UserStore()

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.status(200).json({
      results: users,
      message: `${users.length} user inforamtion has been retrived succesfully`,
    })
  } catch (error) {
    res.status(200).json({ error: error })
  }
}

const show = async (req: Request, res: Response) => {
  const id: number = +req.params.id

  try {
    const user = await store.show(id)
    res.status(200).json({
      results: user,
      message: `user information with id:${id} has been retrived succesfully`,
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

const register = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  }
  try {
    const createdUser = await store.register(user)

    if (!createdUser.errMsg) {
      res.status(200).json({
        results: createdUser,
        message: `New user with username:${createdUser.username} has been registered succesfully`,
      })
    } else if (createdUser.errMsg) {
      res.status(400).json({
        message: createdUser.errMsg,
      })
    }
  } catch (error) {
    res.status(400).send({ message: `error here: ${error}` })
  }
}

const login = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  }

  try {
    const loggedUser = await store.login(
      user.username as string,
      user.password as string
    )
    if (!loggedUser.errMsg) {
      res.status(200).json({
        results: loggedUser,
        message: `user with name:${user.username} has been logged succesfully`,
      })
    } else if (loggedUser.errMsg) {
      res.status(400).json({
        message: loggedUser.errMsg,
      })
    }
  } catch (error) {
    res.status(400).send({ message: `error here: ${error}` })
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: 'Authorized You are good to go',
  })
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
  index,
  show,
  register,
  login,
  auth,
  remove,
}
