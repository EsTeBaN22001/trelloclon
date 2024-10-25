import { CardModel } from '../Models/Card.model.js'

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

  res.send(newCard)
}
