import { Board, Card, List, User, UserBoards } from '../../models/init-models.js'

export const getMeBoards = async (req, res) => {
  const { email } = req.tokenInfo

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) throw new Error('Error getting user')

    const userBoards = await UserBoards.findAll({
      where: {
        userId: user.id
      }
    })

    if (!userBoards) throw new Error('Error getting boards')

    const boards = await Promise.all(
      userBoards.map(async userBoard => {
        const board = await Board.findOne({
          where: {
            id: userBoard.boardId
          }
        })
        return board || null
      })
    )

    res.json(boards)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const getBoard = async (req, res) => {
  const { boardId } = req.params

  try {
    let board = await Board.findByPk(boardId)

    if (!board) throw new Error('Error getting board')

    const userLists = await List.findAll({ where: { boardId }, order: [['position', 'ASC']] })

    const lists = await Promise.all(
      userLists.map(async userList => {
        const cards = await Card.findAll({ where: { listId: userList.id }, order: [['position', 'ASC']] })
        return {
          ...userList.get({ plain: true }),
          cards
        }
      })
    )

    if (lists.length > 0) {
      board = {
        ...board.get({ plain: true }),
        lists
      }
    }

    if (!board) throw new Error('Error getting board')

    res.json(board)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const createBoard = async (req, res) => {
  const { email } = req.tokenInfo
  const { title, backgroundColor } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      res.status(400)
      return res.send({ success: false, message: 'Error creating board' })
    }

    // crear nueva board
    const newBoard = await Board.create({ title, backgroundColor })

    if (!newBoard) throw new Error('Error creating board')

    const newUserBoard = await UserBoards.create({ boardId: newBoard.id, userId: user.id })

    if (!newUserBoard) throw new Error('Error creating board')

    res.json({
      id: newBoard.insertId,
      title,
      backgroundColor
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const deleteBoard = async (req, res) => {
  const { boardId } = req.params

  try {
    if (!boardId) throw new Error('Error deleting board')

    const deleteResult = await Board.destroy({ where: { id: boardId } })

    if (!deleteResult) throw new Error('Error deleting board')

    res.json({ message: 'Board deleted succesfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
