import { pool } from '../db.js'

export class BoardModel {
  static table = 'board'

  static async getBoard (id) {
    try {
      const [result] = await pool.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])

      if (result.length > 0) {
        return result[0]
      }

      return false
    } catch (error) {
      return { success: false, error }
    }
  }

  static async createBoard (title, backgroundColor) {
    try {
      const [result] = await pool.query(`INSERT INTO ${this.table} (title, backgroundColor) VALUES(?, ?)`, [title, backgroundColor])

      if (!result || result.affectedRows <= 0) {
        return false
      }
      return result
    } catch (error) {
      return { success: false, error }
    }
  }

  static async deleteBoard (boardId) {
    try {
      const [result] = await pool.query(`DELETE FROM ${this.table} WHERE id = ${boardId}`)

      if (result.affectedRows === 0) {
        return false
      }

      return true
    } catch (error) {
      return { success: false, error }
    }
  }
}
