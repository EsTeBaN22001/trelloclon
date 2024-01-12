import bcrypt from 'bcrypt'
import { registerUser, userExistsByEmail } from '../Models/User.model.js'
import { generateToken } from '../Middlewares/jwt.js'

export const registerController = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await userExistsByEmail(email)

  if (userExists) {
    res.status(400)
    return res.end(
      JSON.stringify({
        success: false,
        message: 'This email has already in use'
      })
    )
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
    return res.end(
      JSON.stringify({
        success: false,
        message: 'This email is not associated with an account'
      })
    )
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
