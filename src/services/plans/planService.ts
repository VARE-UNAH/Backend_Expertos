import { prisma } from "../../config/db";

export const getPlans = async (userId: number) =>{
    const plans = await prisma.plan.findMany({
        where:{ userId: userId},
        select:{
            id: true,
            name: true, 
            price: true,
            description: true,
        }
    });
    return plans;
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
};
