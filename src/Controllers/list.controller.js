import { ListModel } from '../Models/List.model.js'

export const getListsByBoardId = async (req, res) => {
  const {boardId} = req.params
  
  const lists = await ListModel.getListsByBoardId(boardId)

  if(!lists){
    res.status(400).send({success: false, message: 'Error getting lists'})
  }

  res.send(lists)
}

export const createList = async (req, res) => {
  const { title, position, boardId } = req.body

  const newList = await ListModel.createList(title, position, boardId)

  if (!newList) {
    return res.status(400).send({ success: false, message: 'Error creating list' })
  }
  
  res.send({
    id: newList.insertId,
    title,
    position,
    boardIdq
  })
}
