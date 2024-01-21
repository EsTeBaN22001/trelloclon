import { pool } from '../db.js'

export class UserModel {
  static table = 'user'

  static async registerUser ({ name, email, password, avatar }) {
    try {
      const [result] = await pool.query(`INSERT INTO ${this.table} (name, email, password, avatar) VALUES (?, ?, ?, ?)`, [
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

  static async getUserByEmail (email) {
    try {
      const [result] = await pool.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])

      if (result.length > 0) {
        return result[0]
      }

      return false
    } catch (error) {
      return { success: false, error }
    }
  }

  static async updatePassword (id, newPassword) {
    try {
      const [result] = await pool.query(`UPDATE ${this.table} SET password = ? WHERE id = ?`, [newPassword, id])

      if (result.affectedRows > 0) {
        return result
      }
      return false
    } catch (error) {
      return { success: false, error }
    }
  }
}
