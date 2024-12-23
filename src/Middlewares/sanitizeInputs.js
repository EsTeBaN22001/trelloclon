import { body } from 'express-validator'
import sanitizeHtml from 'sanitize-html'

const sanitizeField = (field, optional = false) => {
  let validator = body(field)
    .trim()
    .customSanitizer(value => sanitizeHtml(value))

  if (optional) {
    validator = validator.optional({ nullable: true, checkFalsy: true })
    // validator = validator.optional({values: 'null' || 'falsy'})
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

// BOARDS
export const sanitizeNewBoard = [sanitizeField('title'), sanitizeField('backgroundColor')]

// LISTS
export const sanitizeNewList = [sanitizeField('title'), sanitizeField('position').toInt(), sanitizeField('boardId')]

// CARDS
export const sanitizeNewCard = [sanitizeField('title'), sanitizeField('listId'), sanitizeField('position').toInt()]
export const sanitizeUpdateCard = [sanitizeField('id', true), sanitizeField('title', true), sanitizeField('listId', true), sanitizeField('position', true), sanitizeField('description', true)]
