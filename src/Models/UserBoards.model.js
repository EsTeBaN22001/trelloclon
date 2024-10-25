import { pool } from '../db.js'

export class UserBoardsModel {
  static table = 'userboards'

  static async getMeBoards (userId) {
    try {
      const [result] = await pool.query(`SELECT * FROM ${this.table} WHERE userId = ?`, [userId])

      if (result.length > 0) {
        return result
      }

      return []
    } catch (error) {
      return { success: false, error }
    }
  }

  static async createUserBoard (userId, boardId) {
    try {
      const [result] = await pool.query(`INSERT INTO ${this.table} (boardId, userId) VALUES(?, ?)`, [boardId, userId])

      if (!result || result.affectedRows <= 0) {
        return false
      }
      return result
    } catch (error) {
      return { success: false, error }
    }
  }
}
