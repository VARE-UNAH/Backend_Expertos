import { body, param } from 'express-validator';
import  handleInputErrors  from '../../middleware/HandleInputError'; // Asegúrate de tener esta función para manejar errores de entrada

export const createPlanValidators = [
  body('name')
    .isString()
    .withMessage('El nombre del plan debe ser una cadena de texto')
    .notEmpty()
    .withMessage('El nombre del plan es requerido'),
  body('description')
    .isString()
    .withMessage('La descripción del plan debe ser una cadena de texto')
    .notEmpty()
    .withMessage('La descripción del plan es requerida'),
  body('price')
    .isNumeric()
    .withMessage('El precio del plan debe ser un número')
    .notEmpty()
    .withMessage('El precio del plan es requerido'),
  handleInputErrors
];

export const actualizarPlanValidators = [
  param('planId')
    .isNumeric()
    .withMessage('El ID del plan debe ser un número entero')
    .custom(value => {
      if (value <= 0) {
        throw new Error('El ID del plan debe ser mayor que 0');
      }
      return true;
    }),
  body('name')
    .optional()
    .isString()
    .withMessage('El nombre del plan, si se proporciona, debe ser una cadena de texto'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción del plan, si se proporciona, debe ser una cadena de texto'),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('El precio del plan, si se proporciona, debe ser un número'),
  handleInputErrors
];

export const getPlanByIdValidators = [
  param('planId')
    .isNumeric()
    .withMessage('El ID del plan debe ser un número entero')
    .custom(value => {
      if (value <= 0) {
        throw new Error('El ID del plan debe ser mayor que 0');
      }
      return true;
    }),
  handleInputErrors
];

export const getClientsPlanValidators = [
  // En este caso, `userId` se obtiene del `req.user.id`, así que no hay validación para esta ruta.
  (req, res, next) => next()
];
