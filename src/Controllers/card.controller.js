import { CardModel } from '../Models/Card.model.js'

export const getCardsByListId = async (req, res) => {
  const { listId } = req.params

  if (!listId) {
    res.status(400).send({ success: false, message: 'Error getting cards' })
  }

  const cards = await CardModel.getCardsByListId(listId)

  if (!cards) {
    res.status(400).send({ success: false, message: 'Error getting cards' })
  }

  res.send(cards)
}

export const createCard = async (req, res) => {
  const { title, listId, position } = req.body

  const newCard = await CardModel.createCard(title, listId, position)

  if (!newCard) {
    res.status(400)
    return res.send({
      success: false,
      message: 'Error creating card'
    })
  }

  console.log('newCard: ', newCard)

  console.log('final object', {
    id: newCard.insertId,
    title,
    listId,
    position
  })

  res.send({
    id: newCard.insertId,
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

  const updateCard = await CardModel.updateCard(cardId, cardProps)

  if (!updateCard) {
    return res.status(400).send({ success: false, message: 'Error updating card position' })
  }

  return res.status(200).send({ success: true, message: 'Card position updated succesfully' })
}

export const deleteCard = async (req, res) => {
  const { cardId } = req.params

  if (!cardId) {
    return res.status(400).send({ success: false, message: 'Error deleting card' })
  }

  const deleteResult = await CardModel.deleteCard(cardId)

  if (!deleteResult) {
    return res.status(400).send({ success: false, message: 'Error deleting card' })
  }

  res.send({ success: true, message: 'Card deleted succesfully' })
}
