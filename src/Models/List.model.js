import { pool } from '../db.js'

export class ListModel {
  static table = 'list'

  static async getListsByBoardId (boardId) {
    try {
      const [result] = await pool.query('SELECT * FROM list WHERE boardId = ? ORDER BY position ASC', [boardId])

      if (result.length > 0) {
        return result
      }

      return []
    } catch (err) {
      return { success: false, err }
    }
  }

  static async createList (title, position, boardId) {
    try {
      const [result] = await pool.query(`INSERT INTO ${this.table} (title, position, boardId) VALUES (?, ?, ?)`, [title, position, boardId])

      if (!result || result.affectedRows <= 0) {
        return false
      }

      return result
    } catch (error) {
      return { success: false, error }
    }
  }

  static async updateListPosition (listId, position) {
    try {
      const [result] = await pool.query(`UPDATE ${this.table} SET position = ? WHERE id = ?`, [position, listId])

      if (!result || result.affectedRows <= 0) {
        return false
      }

      return true
    } catch (error) {
      return { success: false, error }
    }
  }

  static async deleteList (listId) {
    try {
      const [result] = await pool.query(`DELETE FROM ${this.table} WHERE id = ${listId}`)

      if (result.affectedRows === 0) {
        return false
      }

      return true
    } catch (error) {
      return { success: false, error }
    }
  }
}
