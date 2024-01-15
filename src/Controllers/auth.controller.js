import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail, registerUser, updatePassword, userExistsByEmail } from '../Models/User.model.js'
import { generateToken, generateRecoveryToken } from '../Middlewares/jwt.js'
import { JWT_SECRET_KEY } from '../config.js'

export const registerController = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await userExistsByEmail(email)

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

  const newUser = await registerUser(user)

  res.status(200)
  res.send(newUser)
}

export const loginController = async (req, res) => {
  const { email, password } = req.body

  const userExists = await userExistsByEmail(email)

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

  const userExists = await userExistsByEmail(email)

  let isAvailable = false

  if (!userExists) {
    isAvailable = true
  }

  res.send({ isAvailable })
}

export const recovery = async (req, res) => {
  const { email } = req.body

  const userExists = userExistsByEmail(email)

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
      const user = await getUserByEmail(verifyToken.email)

      if (!user) {
        return res.send({
          success: false,
          message: 'This email is not associated with an account'
        })
      }

      const passwordHash = await bcrypt.hash(newPassword, 5)

      const update = await updatePassword(user.id, passwordHash)

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
