import { body } from 'express-validator'
import sanitizeHtml from 'sanitize-html'

const sanitizeField = field => {
  return body(field)
    .notEmpty()
    .trim()
    .customSanitizer(value => sanitizeHtml(value))
}

// AUTH
export const sanitizeRegisterUser = [sanitizeField('name'), sanitizeField('email').isEmail(), sanitizeField('password')]
export const sanitizeLoginUser = [sanitizeField('email').isEmail(), sanitizeField('password')]
export const sanitizeEmailInput = [sanitizeField('email').isEmail()]
export const sanitizeChangePassword = [sanitizeField('newPassword'), sanitizeField('token')]

// BOARDS
export const sanitizeNewBoard = [sanitizeField('title'), sanitizeField('backgroundColor')]

// LISTS

export const sanitizeNewList = [sanitizeField('title'), sanitizeField('position'), sanitizeField('boardId')]

// CARDS
export const sanitizeNewCard = [sanitizeField('title'), sanitizeField('listId'), sanitizeField('position')]
