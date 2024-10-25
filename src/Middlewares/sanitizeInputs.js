import { body } from 'express-validator'
import sanitizeHtml from 'sanitize-html'

const sanitizeField = field => {
  return body(field)
    .notEmpty()
    .trim()
    .customSanitizer(value => sanitizeHtml(value))
}

export const sanitizeRegisterUser = [sanitizeField('name'), sanitizeField('email').isEmail(), sanitizeField('password')]

export const sanitizeLoginUser = [sanitizeField('email').isEmail(), sanitizeField('password')]

export const sanitizeEmailInput = [sanitizeField('email').isEmail()]

export const sanitizeChangePassword = [sanitizeField('newPassword'), sanitizeField('token')]

export const sanitizeNewBoard = [sanitizeField('title'), sanitizeField('backgroundColor')]

export const sanitizeNewList = [sanitizeField('title'), sanitizeField('position'), sanitizeField('boardId')]
