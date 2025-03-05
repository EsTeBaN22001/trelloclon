import { Card } from '../../models/init-models.js'

export const getCardsByListId = async (req, res) => {
  const { listId } = req.params

  try {
    if (!listId) throw new Error('Error getting list')

    const cards = await Card.findAll({ where: { listId } })

    if (!cards) throw new Error('Error getting cards')

    res.json(cards)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const createCard = async (req, res) => {
  const { title, listId, position } = req.body

  try {
    const newCard = await Card.create({ title, position, listId })

    if (!newCard) throw new Error('Error creating card')

    res.json({
      id: newCard.id,
      title,
      listId,
      position
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const updateCard = async (req, res) => {
  const { cardId } = req.params
  const cardProps = req.body

  try {
    if (!cardId) throw new Error('Error getting cardId')

    const updateCard = await Card.update(cardProps, { where: { id: cardId } })

    if (!updateCard) throw new Error('Error updating card position')

    return res.json({ success: true, message: 'Card updated succesfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const deleteCard = async (req, res) => {
  const { cardId } = req.params

  try {
    if (!cardId) throw new Error('Error getting cardId')

    const deleteResult = await Card.destroy({ where: { id: cardId } })

    if (!deleteResult) throw new Error('Error deleting card')
    res.json({ success: true, message: 'Card deleted succesfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
