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

  static async updateCard (id, fields) {
    try {
      // Validar que se proporcione al menos un campo para actualizar
      if (Object.keys(fields).length === 0) {
        throw new Error('No fields provided to update')
      }

      // Construir dinámicamente la consulta SQL
      const setClause = Object.keys(fields)
        .map(key => `${key} = ?`)
        .join(', ') // Genera algo como "position = ?, listId = ?"

      const values = Object.values(fields) // Los valores correspondientes
      values.push(id) // Agregar el ID al final para la cláusula WHERE

      const [result] = await pool.query(
        `UPDATE ${this.table} SET ${setClause} WHERE id = ?`,
        values
      )

      if (!result || result.affectedRows <= 0) {
        return false // Indicar que no se actualizó ninguna fila
      }

      return true // Actualización exitosa
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
