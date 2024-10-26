import { CardModel } from '../Models/Card.model.js'

export const getCardsByListId = async (req, res) => {
  const {listId} = req.params

  if(!listId){
    res.status(400).send({success: false, message: 'Error getting cards'})
  }
  
  const cards = await CardModel.getCardsByListId(listId)

  if(!cards){
    res.status(400).send({success: false, message: 'Error getting cards'})
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

  res.send(newCard)
}
