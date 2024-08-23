// src/services/firebaseService.js
import { prisma } from "../../config/db";

export const userRegister = async function( 
  email: string, 
  uid: string, 
  firstName: string, 
  middleName: string, 
  firstLastName: string, 
  secondLastName: string) {
  console.log('Registro de usuario:', email, uid);
  
  try {
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      console.log('El correo electrónico ya está registrado.');
      throw new Error('El correo electrónico ya está registrado.');
    }

    // Verificar si ya existe un usuario con el mismo UID de Firebase
    const existingUserByUid = await prisma.user.findUnique({
      where: { firebaseUid: uid },
    });

    if (existingUserByUid) {
      console.log('El UID de Firebase ya está registrado.');
      throw new Error('El UID de Firebase ya está registrado.');
    }
    const person = await prisma.person.create({
      data:{
        firstName: firstName,
        middleName: middleName,
        lastName: firstLastName,
        secondLastName: secondLastName,
      }
    });
    // Crear un nuevo usuario si no existen conflictos
    const user = await prisma.user.create({
      data: {
        personId: person.id,
        email,
        firebaseUid: uid,
      },
    });

    

    

    console.log('Usuario creado: ', user, 'Persona creado: ', person);
    return user;
  } catch (error) {
    // Manejo de errores específicos de Prisma
    if (error.code === 'P2002') {
      console.error('Error de unicidad en Prisma:', error);
      throw new Error('Error al registrar el usuario debido a una restricción de unicidad.');
    }

    // Propagar otros errores
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: number) => {
  const user = await prisma.user.findFirst({
    where:{id: userId},
    select: {email: true,
      active: true,
      id: true,
      verified: true,
      personId: true
    }
  });

  const person = await prisma.person.findFirst({
    where:{id: user.personId},
    select:{firstName: true,middleName: true, lastName: true,secondLastName: true,phoneNumber: true,}
  });
  return {
    user,
    person
  };
};
