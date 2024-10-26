import { BoardModel } from '../Models/Board.model.js'
import { UserModel } from '../Models/User.model.js'
import { UserBoardsModel } from '../Models/UserBoards.model.js'
import { ListModel } from '../Models/List.model.js'
import { CardModel } from '../Models/Card.model.js'

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

export const getMeBoards = async (req, res) => {
  const { email } = req.tokenInfo

  const user = await UserModel.getUserByEmail(email)

  
  const userBoards = await UserBoardsModel.getMeBoards(user.id)

  
  const boards = await Promise.all(userBoards.map(async userBoard => {
    const board = await BoardModel.getBoard(userBoard.boardId)
    return board || null
  }))
  
  return res.send(boards)

  res.send(boards)
}

export const getBoard = async (req, res) => {
  const { boardId } = req.params

  let board = await BoardModel.getBoard(boardId)

  if(!board){
    return res.status(400).send({success: false, message: 'Error getting board'})
  }

  const userLists = await ListModel.getListsByBoardId(boardId)
  
  const lists = await Promise.all(userLists.map(async (userList) => {
    const cards = await CardModel.getCardsByListId(userList.id)
    return {
      ...userList,
      cards
    }
    
  }))
  
  if(lists.length > 0){
    board = {
      ...board,
      lists
    }
  }
  

  if (!board) {
    res.status(400)
    return res.send({
      success: false,
      message: 'Error getting board'
    })
  }

  res.send(board)
}
