import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateToken, generateRecoveryToken } from '../Middlewares/jwt.js'
import { JWT_SECRET_KEY } from '../config.js'

import { User } from '../../models/init-models.js'

export const registerController = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({
    where: {
      email
    }
  })

  if (userExists) {
    res.status(400)
    return res.send({
      success: false,
      message: 'This email has already in use'
    })
  }

  const user = {
    name,
    email,
    password: await bcrypt.hash(password, 5),
    avatar: 'https://pic.onlinewebfonts.com/thumbnails/icons_110805.svg'
  }

  // const newUser = await UserModel.registerUser(user)
  const newUser = await User.create(user)

  if (!newUser) {
    return res.status(400).send({
      success: false,
      message: 'User has nos been created'
    })
  }

  res.status(200)
  res.send(newUser)
}

export const loginController = async (req, res) => {
  const { email, password } = req.body

  const userExists = await User.findOne({
    where: {
      email
    }
  })

  if (!userExists || JSON.stringify(userExists) === '{}') {
    res.status(400)
    return res.send({
      success: false,
      message: 'This email is not associated with an account'
    })
  }

  // verificar contraseña
  const verifyToken = await bcrypt.compare(password, userExists.password)

  // generar token
  if (!verifyToken) {
    res.status(400)
    return res.end(
      JSON.stringify({
        success: false,
        message: 'Password is incorrect'
      })
    )
  }

  const token = generateToken(email)

  res.send({ token })
}

export const isAvailable = async (req, res) => {
  const { email } = req.body

  // const userExists = await UserModel.getUserByEmail(email)
  const userExists = await User.findOne({
    where: {
      email
    }
  })

  let isAvailable = false

  if (!userExists) {
    isAvailable = true
  }

  res.send({ isAvailable })
}

export const recovery = async (req, res) => {
  const { email } = req.body

  // const userExists = UserModel.getUserByEmail(email)
  const userExists = await User.findOne({ where: { email } })

  if (!userExists) {
    res.status(400)
    return res.send({
      success: false,
      message: 'This email is not associated with an account'
    })
  }

  const token = generateRecoveryToken(email)

  res.send({
    recoveryToken: token
  })
}

export const changePassword = async (req, res) => {
  const { token, newPassword } = req.body

  // validar el token
  try {
    const verifyToken = jwt.verify(token, JWT_SECRET_KEY)

    if (verifyToken) {
      const user = await User.findOne({ where: { email: verifyToken.email } })

      console.log(user)

      if (!user) {
        return res.send({
          success: false,
          message: 'This email is not associated with an account'
        })
      }

      const passwordHash = await bcrypt.hash(newPassword, 5)

      const update = await User.update({ password: passwordHash }, { where: { id: user.id } })

      if (!update) {
        res.status(400)
        return res.send({
          success: false,
          message: 'Password is not changed'
        })
      }

      return res.send({
        message: 'Password changed'
      })
    }

    res.send({ verifyToken })
  } catch (error) {
    res.status(401)
    return res.send({
      success: false,
      message: 'Unauthorized'
    })
  }
}

export const profile = async (req, res) => {
  const { email } = req.tokenInfo
  const user = await User.findOne({ where: { email } })

  if (!user) {
    res.status(400)
    return res.send({
      message: 'error getting profile'
    })
  }

  res.send(user)
}
