import { body } from 'express-validator'
import sanitizeHtml from 'sanitize-html'

const sanitizeField = (field, optional = false) => {
  let validator = body(field)
    .trim()
    .customSanitizer(value => sanitizeHtml(value))

  if (optional) {
    validator = validator.optional({ nullable: true, checkFalsy: true })
  } else {
    validator = validator.notEmpty()
  }

  return validator
}

// AUTH
export const sanitizeRegisterUser = [sanitizeField('name'), sanitizeField('email').isEmail(), sanitizeField('password')]
export const sanitizeLoginUser = [sanitizeField('email').isEmail(), sanitizeField('password')]
export const sanitizeEmailInput = [sanitizeField('email').isEmail()]
export const sanitizeChangePassword = [sanitizeField('newPassword'), sanitizeField('token')]
export const sanitizeChangeUserinfo = [
  sanitizeField('email').isEmail(),
  sanitizeField('newName', true),
  sanitizeField('newEmail', true)
]

// BOARDS
export const sanitizeNewBoard = [sanitizeField('title'), sanitizeField('backgroundColor')]
export const sanitizeUpdateBoard = [
  sanitizeField('id', true),
  sanitizeField('title', true),
  sanitizeField('backgroundColor', true)
]

// LISTS
export const sanitizeNewList = [sanitizeField('title'), sanitizeField('position').toInt(), sanitizeField('boardId')]
export const sanitizeUpdateList = [sanitizeField('id', true), sanitizeField('position', true).toInt()]

// CARDS
export const sanitizeNewCard = [sanitizeField('title'), sanitizeField('listId'), sanitizeField('position').toInt()]
export const sanitizeUpdateCard = [
  sanitizeField('id', true),
  sanitizeField('title', true),
  sanitizeField('listId', true),
  sanitizeField('position', true),
  sanitizeField('description', true)
]
