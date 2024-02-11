import { BoardModel } from '../Models/Board.model.js'
import { UserModel } from '../Models/User.model.js'
import { UserBoardsModel } from '../Models/UserBoards.model.js'

export const createBoard = async (req, res) => {
  const { email } = req.tokenInfo
  const { title, backgroundColor } = req.body

  const user = await UserModel.getUserByEmail(email)

  // crear nueva board
  const newBoard = await BoardModel.createBoard(title, backgroundColor)

  if (!newBoard) {
    res.status(400)
    return res.send({
      success: false,
      message: 'Error creating board'
    })
  }

  const newUserBoard = await UserBoardsModel.createUserBoard(user.id, newBoard.insertId)

  if (!newUserBoard) {
    res.status(400)
    return res.send({
      success: false,
      message: 'Error creating board'
    })
  }

  res.send({
    id: newBoard.insertId,
    title,
    backgroundColor
  })
}

export const getBoards = async (req, res) => {
  const { email } = req.tokenInfo

  const user = await UserModel.getUserByEmail(email)

  const userBoardsId = await UserBoardsModel.getUserBoards(user.id)

  const boards = await Promise.all(userBoardsId.map(async userBoard => {
    const board = await BoardModel.getBoard(userBoard.id)
    return board || null
  }))

  res.send(boards)
}

export const getBoard = async (req, res) => {
  const { id } = req.params

  const board = await BoardModel.getBoard(id)

  if (!board) {
    res.status(400)
    return res.send({
      success: false,
      message: 'Error getting board'
    })
  }

  res.send(board)
}
