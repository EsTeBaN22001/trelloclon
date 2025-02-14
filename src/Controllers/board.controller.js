import { Board, Card, List, User, UserBoards } from '../../models/init-models.js'

export const getMeBoards = async (req, res) => {
  const { email } = req.tokenInfo

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(400).send({ success: false, message: 'Error getting boards' })
  }

  const userBoards = await UserBoards.findAll({
    where: {
      userId: user.id
    }
  })

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

  res.send(boards)
}

export const getBoard = async (req, res) => {
  const { boardId } = req.params

  let board = await Board.findByPk(boardId)

  if (!board) {
    return res.status(400).send({ success: false, message: 'Error getting board' })
  }

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

  if (!board) {
    res.status(400)
    return res.send({ success: false, message: 'Error getting board' })
  }

  res.send(board)
}

export const createBoard = async (req, res) => {
  const { email } = req.tokenInfo
  const { title, backgroundColor } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    res.status(400)
    return res.send({ success: false, message: 'Error creating board' })
  }

  // crear nueva board
  const newBoard = await Board.create({ title, backgroundColor })

  if (!newBoard) {
    res.status(400)
    return res.send({ success: false, message: 'Error creating board' })
  }

  const newUserBoard = await UserBoards.create({ boardId: newBoard.id, userId: user.id })

  if (!newUserBoard) {
    res.status(400)
    return res.send({ success: false, message: 'Error creating board' })
  }

  res.send({
    id: newBoard.insertId,
    title,
    backgroundColor
  })
}

export const deleteBoard = async (req, res) => {
  const { boardId } = req.params

  if (!boardId) {
    return res.status(400).send({ success: false, message: 'Error deleting board' })
  }

  const deleteResult = await Board.destroy({ where: { id: boardId } })

  if (!deleteResult) {
    return res.status(400).send({ success: false, message: 'Error deleting board' })
  }

  res.send({ success: true, message: 'Board deleted succesfully' })
}
