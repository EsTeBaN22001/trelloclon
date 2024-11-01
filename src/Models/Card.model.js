import { pool } from '../db.js'

export class CardModel {
  static table = 'card'

  static async getCardsByListId (listId) {
    try {
      const result = await pool.query(`SELECT * FROM ${this.table} WHERE listId = ?`, [listId])

      if (result.length > 0) {
        return result[0]
      }

      return false
    } catch (error) {
      return { success: false, error }
    }
  }

  static async createCard (title, listId, position) {
    try {
      const [result] = await pool.query(`INSERT INTO ${this.table} (title, listId, position) VALUES (?, ?, ?)`, [title, listId, position])

      if (!result || result.affectedRows <= 0) {
        return false
      }

      return result
    } catch (error) {
      return { success: false, error }
    }
  }

  static async deleteCard (cardId) {
    try {
      const [result] = await pool.query(`DELETE FROM ${this.table} WHERE id = ${cardId}`)

      if (result.affectedRows === 0) {
        return false
      }

      return true
    } catch (error) {
      return { success: false, error }
    }
  }
}
