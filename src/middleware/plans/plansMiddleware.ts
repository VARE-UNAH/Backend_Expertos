import { Request, Response, NextFunction } from 'express';
import { prisma } from "../../config/db";

export const checkPlanExists = async (req: Request, res: Response, next: NextFunction) => {
    const planId = req.body.planId;
    const userId = req.user.id;

    try {
        const existingPlan = await prisma.plan.findFirst({
            where: {
                id: planId,
                userId: userId
            }
        });

        if (!existingPlan) {
            return res.status(400).json({ error: 'El Plan que ha seleccionado no es valido o no le pertence' });
        }


        // Si no existe, continúa con el siguiente middleware o controlador
        next();
    } catch (error: any) {
        console.error("Error en checkPlanExists:", error); // Para depuración
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};