import express from 'express';
import { getUserProfileController, registerUserController } from '../../controllers/user/userController'; // Asegúrate de importar correctamente tu controlador
import { authenticate } from '../../middleware/auth/auth';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUserController);
router.get('/profile', authenticate, getUserProfileController);

export default router;
