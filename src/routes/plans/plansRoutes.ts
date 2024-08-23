import express from 'express';
import { getUserPlans } from "../../controllers/plans/plansController"; // Asegúrate de importar correctamente tu controlador
import { authenticate } from '../../middleware/auth/auth';

const router = express.Router();

// Obtener todos los clientes
router.get('/trainer', authenticate, getUserPlans);

export default router;