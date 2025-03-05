import { sequelize } from '../src/db.js'

import _user from './user.js'
import _board from './board.js'
import _list from './list.js'
import _card from './card.js'
import _userBoards from './userboards.js'

const User = _user(sequelize)
const Board = _board(sequelize)
const List = _list(sequelize)
const Card = _card(sequelize)
const UserBoards = _userBoards(sequelize)

export { User, Board, List, Card, UserBoards }
