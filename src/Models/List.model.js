import { pool } from '../db.js'

export class ListModel {
  static table = 'list'

  static async getListsByBoardId (boardId) {
    try {
      const [result] = await pool.query(`SELECT * FROM list WHERE boardId = ${boardId}`)

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
}
