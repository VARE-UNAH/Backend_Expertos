import { Request, Response } from 'express';
import { actualizarPlan, createPlan, getClientsPlan, getGanancias, getNumeroPlans, getPlanById, getPlans } from '../../services/plans/planService'; // Importa tu servicio

export const getUserPlans = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Obtén el userId desde req.user

  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    const plans = await getPlans(userId); // Llama al servicio con el userId
    return res.status(200).json(plans); // Responde con los planes obtenidos
  } catch (error) {
    console.error('Error al obtener los planes:', error);
    return res.status(500).json({ message: 'Error al obtener los planes' }); // Maneja cualquier error
  }
};

export const getClientsPlanController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  try {
      const clients = await getClientsPlan(userId);
      res.status(200).json(clients);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const getPlanByIdController = async (req: Request, res: Response) => {
  const planId = parseInt(req.params.planId, 10);
  try {
      const plan = await getPlanById(planId);
      if (plan) {
          res.status(200).json(plan);
      } else {
          res.status(404).json({ error: 'Plan no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const createPlanController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { name, description, price } = req.body;
  try {
      const plan = await createPlan(userId, name, description, price);
      res.status(201).json(plan);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


export const getGananciasController = async (req: Request, res: Response) => {
  const userId = req.user.id; // Obtén el userId desde el req.user.id

  if (!userId) {
      return res.status(400).json({ error: 'No autorizado' });
  }

  try {
      const totalGanancias = await getGanancias(userId);
      res.status(200).json({ totalGanancias });
  } catch (error: any) {
      console.error("Failed to get earnings:", error);
      res.status(500).json({ error: error.message || "Error al obtener las ganancias" });
  }
};

export const getNumberPlansController = async (req: Request, res: Response) => {
  const userId = req.user.id; // Obtén el userId desde el req.user.id

  if (!userId) {
      return res.status(400).json({ error: 'No autorizado' });
  }

  try {
      const totalPlanes = await getNumeroPlans(userId);
      res.status(200).json({ totalPlanes });
  } catch (error: any) {
      console.error("Failed to get number of plans:", error);
      res.status(500).json({ error: error.message || "Error al obtener el numero de planes" });
  }
};

export const actualizarPlanController = async (req: Request, res: Response) => {
  const planId = parseInt(req.params.planId, 10);
  const { name, description, price } = req.body;
  try {
      const updatedPlan = await actualizarPlan(planId, name, description, price);
      res.status(200).json(updatedPlan);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
