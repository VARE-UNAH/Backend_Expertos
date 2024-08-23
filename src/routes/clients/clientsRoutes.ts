import express from 'express';
import { getAllClientsController, createClientController } from "../../controllers/clients/clientController"; // Asegúrate de importar correctamente tu controlador
import { authenticate } from '../../middleware/auth/auth';
import { checkClientExists } from "../../middleware/clients/clientsMiddleware";
import { createClientValidators } from '../../validators/clients/clientValidator';
import { checkPlanExists} from '../../middleware/plans/plansMiddleware';

const router = express.Router();

// Obtener todos los clientes
router.get('/', authenticate, getAllClientsController);
router.post('/', authenticate, createClientValidators, checkClientExists, checkPlanExists, createClientController);


export default router;