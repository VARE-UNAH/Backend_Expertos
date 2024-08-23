import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
const admin = require('../../config/firebase/firebase-config');
import { Person, User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, 'id' | 'verified' | 'email' | 'firebaseUid'>
    }
  }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    // Verificar si el encabezado de autorización existe y tiene el formato correcto
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Eliminar el prefijo 'Bearer ' para obtener el token
    const token = authHeader.split(' ')[1]; // Aquí extraemos solo el token
    // Verificar el token con Firebase Admin
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (decodedValue) {
      // Puedes almacenar la información decodificada en `req.user` para usarla más adelante
      const user = await prisma.user.findFirst({
        where: { firebaseUid: decodedValue.uid },
        select: {
          id: true,
          email: true,
          firebaseUid: true,
          verified: true,
          
        }
      });
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          firebaseUid: user.firebaseUid,
          verified: user.verified,
        };
      }
      return next();
    } else {
      return res.status(401).json({ message: 'No autorizado' });
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Sesión expirada' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};
