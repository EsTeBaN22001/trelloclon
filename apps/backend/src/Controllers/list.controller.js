import { List } from '../../models/init-models.js'

export const getListsByBoardId = async (req, res) => {
  const { boardId } = req.params

  try {
    const lists = await List.findAll({ where: { boardId: boardId }, order: [['position', 'ASC']] })

    if (!lists) throw new Error('Error getting lists')

    res.json(lists)
  } catch (err) {
    res.status(500).json({ success: false, message: err.mesagge })
  }
}

export const createList = async (req, res) => {
  const { title, position, boardId } = req.body

  try {
    const newList = await List.create({ title, position, boardId })

    if (!newList) throw new Error('Error creating list')

    res.json({
      id: newList.id,
      title,
      position,
      boardId
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.mesagge })
  }
}

export const updateList = async (req, res) => {
  const { listId } = req.params
  const listProps = req.body

  try {
    if (!listId) throw new Error('Error getting list')

    const updateList = await List.update(listProps, { where: { id: listId } })

    if (!updateList) throw new Error('Error updating list')

    return res.json({ success: true, message: 'List updated succesfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const deleteList = async (req, res) => {
  const { listId } = req.params

  try {
    if (!listId) throw new Error('Error getting list')

    const deleteResult = await List.destroy({ where: { id: listId } })

    if (!deleteResult) throw new Error('Error deleting list')

    res.json({ success: true, message: 'List deleted succesfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
