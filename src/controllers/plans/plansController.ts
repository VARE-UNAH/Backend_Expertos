import { Request, Response } from 'express';
import { getPlans } from '../../services/plans/planService'; // Importa tu servicio

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