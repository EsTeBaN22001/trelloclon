import { pool } from '../db.js'

export const registerUser = async ({ name, email, password, avatar }) => {
  try {
    const [result] = await pool.query('INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)', [
      name,
      email,
      password,
      avatar
    ])

    if (!result || result.affectedRows <= 0) {
      return false
    }

    return {
      id: result.insertId,
      name,
      email,
      avatar
    }
  } catch (error) {
    return { success: false, error }
  }
}

export const userExistsByEmail = async email => {
  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

    if (result.length > 0) {
      return true
    }
    return false
  } catch (error) {
    return { success: false, error }
  }
}
