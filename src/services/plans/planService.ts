import { prisma } from "../../config/db";

export const getPlans = async (userId: number) =>{
    const plans = await prisma.plan.findMany({
        where:{ userId: userId},
        select:{
            id: true,
            name: true, 
            price: true,
            description: true,
            clients : { select: { id: true } },
        }
    });
    const plansWithClientCount = plans.map(plan => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        description: plan.description,
        numberClients: plan.clients.length  // Cuenta el número de clientes
    }));

    return plansWithClientCount;
};

export const getClientsPlan = async (userId: number) =>{
    const clients = await prisma.plan.findMany({
        where:{ userId: userId},
        select:{
            name: true, 
            price: true,
            description: true,
            clients:{select:{
                id: true,
            }}
        }
    })
    return clients;
};

export const getPlanById = async (planId: number) =>{
    const plan = await prisma.plan.findFirst({
        where: {id: planId},
        select:{
            name: true, 
            price: true,
            description: true,
        }
    })
    return plan;
};

export const createPlan = async (userId: number, name: string, description: string, price:number) =>{
    const plan = await prisma.plan.create({
        data:{
            userId: userId,
            name: name,
            description: description,
            price: price
        }
    }) 
    return plan;
};

export const getGanancias = async (userId:number) =>{
    const plan = await prisma.client.findMany({
        where:{plan: {userId: userId}},
        select: {plan: {select:{ price : true}}}
    });
    const totalGanancias = plan.reduce((total, { plan }) => total + (plan?.price || 0), 0);
    return totalGanancias;
};

export const getNumeroPlans = async (userId:number) =>{
    const plan = await prisma.client.count({
        where:{plan: {userId: userId}},
    });
    const totalPlanes = plan
    return totalPlanes;
};

export const actualizarPlan = async (planId: number, name?: string, description?: string, price?: number) => {
    const plan = await prisma.plan.update({
        where: {
            id: planId,
        },
        data: {
            ...(name && { name }),
            ...(description && { description }),
            ...(price && { price }),
        },
    });
    return plan;
};