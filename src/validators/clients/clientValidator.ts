import { body } from 'express-validator';
import handleInputErrors from '../../middleware/HandleInputError'; // Ajusta la ruta según tu estructura

export const createClientValidators = [
  body('DNI')
    .isString()
    .withMessage('El DNI debe ser una cadena de caracteres')
    .matches(/^\d{13}$/)
    .withMessage('El DNI debe ser una cadena de exactamente 13 dígitos numéricos'),
  body('firstName')
    .isString().withMessage('El primer nombre debe ser una cadena de texto')
    .notEmpty().withMessage('El primer nombre es requerido'),
  body('middleName')
    .optional() // Este campo es opcional
    .isString().withMessage('El segundo nombre debe ser una cadena de texto si se proporciona'),
  body('firstLastName')
    .isString().withMessage('El primer apellido debe ser una cadena de texto')
    .notEmpty().withMessage('El primer apellido es requerido'),
  body('secondLastName')
    .optional() // Este campo es opcional
    .isString().withMessage('El segundo apellido debe ser una cadena de texto si se proporciona'),
  body('age')
    .isInt({ min: 0 , max: 100 }).withMessage('La edad debe ser un número entre 0 a 100')
    .notEmpty().withMessage('La edad es requerida'),
  body('height')
    .isInt({ min: 0, max: 300 }).withMessage('La altura debe ser un número entero mayor o igual a 0')
    .notEmpty().withMessage('La altura es requerida'),
  body('planId')
    .isInt().withMessage('El ID del plan debe ser un número entero')
    .custom(value => {
      if (value === 0) {
        throw new Error('Debe seleccionar un plan');
      }
      return true;
    }),
  body('email')
    .isEmail().withMessage('El correo electrónico debe tener un formato válido')
    .notEmpty().withMessage('El correo electrónico es requerido'),
  body('phoneNumber')
    .isString()
    .withMessage('El número de teléfono debe ser una cadena de caracteres')
    .matches(/^[\d+\s()-]+$/)
    .withMessage('El número de teléfono debe contener solo dígitos, espacios, paréntesis, guiones o signos de adición')
    .isLength({ min: 7, max: 15 })
    .withMessage('El número de teléfono debe tener entre 7 y 15 caracteres'),
  body('weight')
    .isInt({ min: 0, max: 600}).withMessage('El peso debe ser un número entero mayor o igual a 0')
    .notEmpty().withMessage('El peso es requerido'),
  body('fatperc')
    .isFloat({ min: 0, max: 100 }).withMessage('El porcentaje de grasa debe ser un número entre 0 y 100')
    .notEmpty().withMessage('El porcentaje de grasa es requerido'),
  handleInputErrors,
];
