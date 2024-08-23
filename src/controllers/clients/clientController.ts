// controllers/clientController.ts
import { Request, Response } from 'express';
import { getAllClients, CreateClient } from '../../services/clients/clientsService'; // Asegúrate de ajustar el path a tu configuración
import { actualizarPlan, createPlan, getClientsPlan, getPlanById } from '../../services/plans/planService';

export const getAllClientsController = async (req: Request, res: Response) => {
    try {
        // Suponiendo que req.user.id está definido por el middleware de autenticación
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing from request.' });
        }

        // Obtener los parámetros de paginación del query string
        const page = parseInt(req.query.page as string, 10) || 1; // Página actual (por defecto 1)
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10; // Tamaño de página (por defecto 10)

        // Validar los parámetros
        if (page <= 0) {
            return res.status(400).json({ error: 'Page number must be greater than 0.' });
        }
        if (pageSize <= 0) {
            return res.status(400).json({ error: 'Page size must be greater than 0.' });
        }

        // Llamar a la función con parámetros de paginación
        const clients = await getAllClients(userId, page, pageSize);

        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'An error occurred while fetching clients.' });
    }
};

export const createClientController = async (req, res) => {
    try {
        const {
            DNI,
            firstName,
            middleName,
            firstLastName,
            secondLastName,
            age,
            height,
            planId,
            email,
            phoneNumber,
            weight,
            fatperc,
            IMC,
        } = req.body;

        // Extraer el userId de req.user.id
        const userId = req.user.id;

        // Llamar al servicio para crear el cliente
        const { cliente, progress } = await CreateClient(
            userId,
            DNI,
            firstName,
            middleName,
            firstLastName,
            secondLastName,
            age,
            height,
            planId,
            email,
            phoneNumber,
            weight,
            fatperc,
            IMC,
        );

        // Responder con éxito
        res.status(201).json({
            cliente,
            progress,
        });
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        return res.status(500).json({ message: error.message });
    }
};



