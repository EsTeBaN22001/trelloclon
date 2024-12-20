import { ListModel } from '../Models/List.model.js'

export const getListsByBoardId = async (req, res) => {
  const { boardId } = req.params

  const lists = await ListModel.getListsByBoardId(boardId)

  if (!lists) {
    res.status(400).send({ success: false, message: 'Error getting lists' })
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
    boardId
  })
}

export const updateListPosition = async (req, res) => {
  const { id, position } = req.body

  if (!id || position === undefined) {
    return res.status(400).send({ success: false, message: 'Error updating list position' })
  }

  const updateList = await ListModel.updateListPosition(id, position)

  if (!updateList) {
    return res.status(400).send({ success: false, message: 'Error updating list position' })
  }

  return res.status(200).send({ success: true, message: 'List position updated succesfully' })
}

export const deleteList = async (req, res) => {
  const { listId } = req.params

  if (!listId) {
    return res.status(400).send({ success: false, message: 'Error deleting list' })
  }

  const deleteResult = await ListModel.deleteList(listId)

  if (!deleteResult) {
    return res.status(400).send({ success: false, message: 'Error deleting list' })
  }

  res.send({ success: true, message: 'List deleted succesfully' })
}
