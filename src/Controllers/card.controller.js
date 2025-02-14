import { Card } from '../../models/init-models.js'

export const getCardsByListId = async (req, res) => {
  const { listId } = req.params

  if (!listId) {
    res.status(400).send({ success: false, message: 'Error getting cards' })
  }

  const cards = await Card.findAll({ where: { listId } })

  if (!cards) {
    res.status(400).send({ success: false, message: 'Error getting cards' })
  }

  res.send(cards)
}

export const createCard = async (req, res) => {
  const { title, listId, position } = req.body

  const newCard = await Card.create({ title, position, listId })

  if (!newCard) {
    res.status(400)
    return res.send({
      success: false,
      message: 'Error creating card'
    })
  }

  res.send({
    id: newCard.id,
    title,
    listId,
    position
  })
}

export const updateCard = async (req, res) => {
  const { cardId } = req.params
  const cardProps = req.body

  if (!cardId) {
    return res.status(400).send({ success: false, message: 'Error updating card position' })
  }

  // const updateCard = await CardModel.updateCard(cardId, cardProps)
  const updateCard = await Card.update(cardProps, { where: { id: cardId } })

  if (!updateCard) {
    return res.status(400).send({ success: false, message: 'Error updating card position' })
  }

  return res.status(200).send({ success: true, message: 'Card updated succesfully' })
}

export const deleteCard = async (req, res) => {
  const { cardId } = req.params

  if (!cardId) {
    return res.status(400).send({ success: false, message: 'Error deleting card' })
  }

  // const deleteResult = await CardModel.deleteCard(cardId)
  const deleteResult = await Card.destroy({ where: { id: cardId } })

  if (!deleteResult) {
    return res.status(400).send({ success: false, message: 'Error deleting card' })
  }

  res.send({ success: true, message: 'Card deleted succesfully' })
}
