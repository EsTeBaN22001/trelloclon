import { pool } from '../db.js'

export class CardModel {
  static table = 'card'

  static async createCard (title, position, listId) {
    try {
      const [result] = await pool.query(`INSERT INTO ${this.table} (title, position, listId) VALUES (?, ?, ?)`, [title, position, listId])

      if (!result || result.affectedRows <= 0) {
        return false
      }

      return result
    } catch (error) {
      return { success: false, error }
    }
  }
}
