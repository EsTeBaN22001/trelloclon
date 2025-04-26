import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateToken, generateRecoveryToken } from '../Middlewares/jwt.js'
import { JWT_SECRET_KEY } from '../config.js'

import { User } from '../../models/init-models.js'

export const registerController = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({
      where: {
        email
      }
    })

    if (userExists) throw new Error('This email has already in use')

    const user = {
      name,
      email,
      password: await bcrypt.hash(password, 5),
      avatar: 'https://pic.onlinewebfonts.com/thumbnails/icons_110805.svg'
    }

    const newUser = await User.create(user)

    if (!newUser) throw new Error('User has nos been created')

    res.json(newUser)
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const userExists = await User.findOne({
      where: {
        email
      }
    })

    if (!userExists || JSON.stringify(userExists) === '{}') throw new Error('This email is not associated with an account')

    // verificar contraseña
    const verifyToken = await bcrypt.compare(password, userExists.password)

    // generar token
    if (!verifyToken) throw new Error('Password is incorrect')

    const token = generateToken(email)

    res.json({ token })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export const isAvailable = async (req, res) => {
  const { email } = req.body

  try {
    const userExists = await User.findOne({
      where: {
        email
      }
    })

    let isAvailable = false

    if (!userExists) isAvailable = true

    res.json({ isAvailable })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export const recovery = async (req, res) => {
  const { email } = req.body

  try {
    const userExists = await User.findOne({ where: { email } })

    if (!userExists) throw new Error('This email is not associated with an account')

    const token = generateRecoveryToken(email)

    res.json({ success: true, recoveryToken: token })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

export const changePassword = async (req, res) => {
  const { token, newPassword } = req.body

  // validar el token
  try {
    const verifyToken = jwt.verify(token, JWT_SECRET_KEY)

    if (!verifyToken) throw new Error('Invalid token')

    const user = await User.findOne({ where: { email: verifyToken.email } })

    if (!user) throw new Error('This email is not associated with an account')

    const passwordHash = await bcrypt.hash(newPassword, 5)

    const update = await User.update({ password: passwordHash }, { where: { id: user.id } })

    if (!update) throw new Error('Password is not changed')

    return res.json({ success: true, message: 'Password changed' })
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message })
  }
}

export const profile = async (req, res) => {
  const { email } = req.tokenInfo

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) throw new Error('Error getting profile')

    res.json(user)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const changeUserinfo = async (req, res) => {
  const { email } = req.body
  const userProps = req.body

  let newToken = null

  if (userProps.newEmail) {
    // Verificar si el nuevo email está disponible
    try {
      const userExists = await User.findOne({ where: { email: userProps.newEmail } })

      if (userExists) throw new Error('This new Email is not available')

      // Renovar y actualizar el jwt
      newToken = await generateToken(userProps.newEmail)

      if (!newToken) throw new Error('Error generating new token')
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message })
    }
  }

  try {
    const saveUserInfo = await User.update({ name: userProps?.newName, email: userProps.newEmail }, { where: { email } })

    if (!saveUserInfo) throw new Error('Error saving user info')

    res.json({ success: true, message: 'The user info updated successfully', newToken })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}
