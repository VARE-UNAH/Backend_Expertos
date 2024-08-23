import { Request, Response, NextFunction } from 'express';
import { prisma } from "../../config/db";

export const checkClientExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email, DNI, phoneNumber } = req.body;
  
    try {
      const existingClient = await prisma.client.findFirst({
        where: { email: email },
      });
  
      if (existingClient) {
        return res.status(400).json({ error: 'El email ya está en uso' });
      }
    
      const DniClient = await prisma.client.findFirst({
        where: { dni: DNI },
      });

      if (DniClient) {
        return res.status(400).json({ error: 'El número de ID ya está en uso' });
      }

      const phoneClient = await prisma.client.findFirst({
        where: { phoneNumber },
      });

      if (phoneClient) {
        return res.status(400).json({ error: 'El número de telefono ya esta en uso' });
      }


  
      // Si no existe, continúa con el siguiente middleware o controlador
      next();
    } catch (error: any) {
      console.error("Error en checkClientExists:", error); // Para depuración
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };