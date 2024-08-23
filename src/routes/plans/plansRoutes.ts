import express from 'express';
import { actualizarPlanController, createPlanController, getClientsPlanController, getGananciasController, getNumberPlansController, getPlanByIdController, getUserPlans } from "../../controllers/plans/plansController"; // Asegúrate de importar correctamente tu controlador
import { authenticate } from '../../middleware/auth/auth';
import { actualizarPlanValidators, createPlanValidators, getPlanByIdValidators } from '../../validators/plans/plansValidator';

const router = express.Router();
//getGananciasController
// Obtener todos los clientes
router.get('/trainer', authenticate, getUserPlans);
router.get('/earnings', authenticate, getGananciasController);
router.get('/numberof', authenticate, getNumberPlansController);
router.get('/clients',authenticate ,getClientsPlanController); // No es necesario pasar userId en la ruta
router.get('/plan-details/:planId',authenticate, getPlanByIdValidators, getPlanByIdController);
router.post('/',authenticate,  createPlanValidators, createPlanController);
router.put('/:planId',authenticate,  actualizarPlanValidators, actualizarPlanController);

export default router;