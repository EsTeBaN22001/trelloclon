import bcrypt from 'bcrypt'
import { registerUser, userExistsByEmail } from '../Models/User.model.js'

export const registerController = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await userExistsByEmail(email)

  if (userExists) {
    res.status(400)
    res.end(
      JSON.stringify({
        success: false,
        message: 'This email has already in use'
      })
    )
    return
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
