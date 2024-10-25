import { ListModel } from '../Models/List.model.js'

export const getLists = async (req, res) => {
  const lists = await ListModel.getLists()

  res.send(lists)
}

export const createList = async (req, res) => {
  const { title, position, boardId } = req.body

  const newList = await ListModel.createList(title, position, boardId)

  if (!newList) {
    return res.status(400).send({ success: false, message: 'Error creating list' })
  }

  res.send(newList)
}
