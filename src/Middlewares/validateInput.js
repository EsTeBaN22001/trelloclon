import { validationResult } from 'express-validator'

export const validateInputs = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsData = errors.array().map(error => ({ message: error.msg, input: error.path }))
    return res.status(400).send({ success: false, errors: errorsData })
  }
  next()
}
