import { pool } from '../db.js'

export class CardModel {
  static table = 'card'

  static async getCardsByListId (listId) {
    try {
      const result = await pool.query(`SELECT * FROM ${this.table} WHERE listId = ? ORDER BY position ASC`, [listId])

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

  static async updateCardPosition (id, position, listId) {
    try {
      const [result] = await pool.query(`UPDATE ${this.table} SET position = ?, listId = ? WHERE id = ?`, [position, listId, id])

      if (!result || result.affectedRows <= 0) {
        return false
      }

      return true
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
