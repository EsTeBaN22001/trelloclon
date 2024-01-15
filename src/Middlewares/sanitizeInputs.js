import { body } from 'express-validator'
import sanitizeHtml from 'sanitize-html'

const sanitizeField = field => {
  return body(field)
    .notEmpty()
    .trim()
    .customSanitizer(value => sanitizeHtml(value))
}

export const sanitizeRegisterUser = [
  sanitizeField('name'),
  sanitizeField('email').isEmail().normalizeEmail(),
  sanitizeField('password')
]

export const sanitizeLoginUser = [sanitizeField('email').isEmail().normalizeEmail(), sanitizeField('password')]

export const sanitizeEmailInput = [sanitizeField('email').isEmail().normalizeEmail()]
