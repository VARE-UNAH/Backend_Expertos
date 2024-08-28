// src/services/firebaseService.js

import { prisma } from "../../config/db";
//prueba
export const getAllClients = async (userId: number, page: number = 1, pageSize: number = 10) => {

    const skip = (page - 1) * pageSize; // Omite los elementos anteriores a la página actual
    const take = pageSize; // Número de elementos a tomar

    const clients = await prisma.client.findMany({
        where: { plan: { userId: userId } },
        select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            secondLastName: true,
            age: true,
            phoneNumber: true,
            email: true,
            height: true,
            progress: {
                select: {
                    date: true,
                    fatperc: true,
                    IMC: true,
                    weight: true,
                },
                orderBy: { date: 'asc' } // Ordena por fecha para obtener el primer y último registro
            },
            plan: {
                select: { name: true }
            },
            TrainingPlan: {
                select: {
                    IH: true,
                    FH: true,
                    TraingDays: {
                        select: {
                            Day: {
                                select: {
                                    name: true,
                                },
                            },
                            Trained_Day: {select:{trained: true,
                                training_DayId: true,
                            }}
                        },
                    },
                },
            },
        },

        skip: skip, // Omite los primeros elementos para la paginación
        take: take  // Limita el número de resultados
    });

    // Formatear la respuesta para incluir weightInitial y weightCurrent
    const formattedClients = clients.map(client => {
        // Obtener el primer y último registro de progreso
        const progressRecords = client.progress;
        const weightInitial = progressRecords.length > 0 ? progressRecords[0].weight : null;
        const weightCurrent = progressRecords.length > 0 ? progressRecords[progressRecords.length - 1].weight : null;
        const IMCInitial = progressRecords.length > 0 ? progressRecords[0].IMC : null;
        const IMCCurrent = progressRecords.length > 0 ? progressRecords[progressRecords.length - 1].IMC : null;
        const fatInitial = progressRecords.length > 0 ? progressRecords[0].fatperc : null;
        const fatCurrent = progressRecords.length > 0 ? progressRecords[progressRecords.length - 1].fatperc : null;
        const iHourString = client.TrainingPlan ? formatHour(client.TrainingPlan.IH) : 'N/A';
        const fHourString = client.TrainingPlan ? formatHour(client.TrainingPlan.FH) : 'N/A';
        let trainedDaysCount = 0;
        let nonTrainedDaysCount = 0;
        client.TrainingPlan?.TraingDays.forEach(day => {
            const trainedDays = day.Trained_Day.filter(trainedDay => trainedDay.trained).length;
            const nonTrainedDays = day.Trained_Day.filter(trainedDay => !trainedDay.trained).length;
            trainedDaysCount += trainedDays;
            nonTrainedDaysCount += nonTrainedDays;
        });

        return {
            ...client,
            weightInitial,
            weightCurrent,
            IMCInitial,
            IMCCurrent,
            fatInitial,
            fatCurrent,
            iHourString,
            fHourString,
            trainedDaysCount,
            nonTrainedDaysCount
        };
    });

    return formattedClients;
};



export const getClientById = async (clientId: number) => {
    const cliente = await prisma.client.findFirst({
        where: { id: clientId },
        select: {
            firstName: true,
            middleName: true,
            lastName: true,
            secondLastName: true,
            email: true,
            phoneNumber: true,
            age: true,
            active: true,
            plan: {
                select: {
                    id: true,
                }
            }

        }
    })
};

function formatHour(hour: number | null): string {
    if (hour === null || hour === undefined) {
        return 'N/A'; // O cualquier valor predeterminado apropiado
    }

    if (hour < 1 || hour > 24) {
        throw new Error("Hour must be between 1 and 24");
    }

    // Convert 24-hour format to 12-hour format
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert 0 to 12

    return `${formattedHour}${isPM ? 'PM' : 'AM'}`;
}




export const CreateClient = async (
    userId: number, 
    DNI: string, 
    firstName: string, 
    middleName: string, 
    firstLastName: string, 
    secondLastName: string,
    age: number,
    height: number,
    planId: number,
    email: string,
    phoneNumber: string,
    weight: number,
    fatperc: number,
    imc: number,
) => {
    const cliente = await prisma.client.create({
        data: { 
            dni: DNI,
            email: email,
            firstName,
            lastName: firstLastName,
            middleName,
            secondLastName,
            age,
            planId,
            phoneNumber,
            active: true,
            height
        }
    });

    if (!cliente) {
        throw new Error('Client creation failed');
    }
    const imcFloat = parseFloat(imc.toFixed(2));
    console.log(imc);
    const progress = await prisma.progress.create({
        data:{
            clientId: cliente.id,
            weight: weight,
            fatperc: fatperc,
            IMC : imcFloat
        }
    });

    if (!progress) {
        throw new Error('Progress creation failed');
    }

    return { cliente, progress };
};

const calcularIMC = (peso: number, altura: number) => {
    const imc = parseFloat(((peso/2.2) / (altura * altura)).toFixed(2));
    console.log(imc);
    return imc
  };