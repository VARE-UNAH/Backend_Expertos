import { Request, Response } from 'express';
import { getUserProfile, userRegister } from '../../services/user/userService'; // Asegúrate de importar correctamente tu servicio

export const registerUserController = async (req: Request, res: Response) => {
  const { email, uid, name, lastName } = req.body;

  if (!email || !uid || !name || !lastName ) {
    return res.status(400).json({ error: 'Faltan campos.' });
  }

  const nameParts = name.trim().split(" ");
  const lastNameParts = lastName.trim().split(" ");
  console.log(nameParts, lastNameParts)
  // Verifica que name y lastName contengan una o dos palabras
  if (nameParts.length < 1 || nameParts.length > 2) {
    return res.status(400).json({ error: "El nombre debe contener una o dos palabras." });
  }

  if (lastNameParts.length < 1 || lastNameParts.length > 2) {
    return res.status(400).json({ error: "El apellido debe contener una o dos palabras." });
  }

  // Separa en firstName, middleName, firstSurname y secondSurname
  const firstName = nameParts[0];
  const middleName = nameParts.length === 2 ? nameParts[1] : "";
  const firstLastName = lastNameParts[0];
  const secondLastName = lastNameParts.length === 2 ? lastNameParts[1] : "";
  console.log(name, lastName)

  try {
    // Llamada al servicio para registrar al usuario
    await userRegister(email, uid, firstName, middleName, firstLastName, secondLastName);
    return res.status(201).json({ error: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

export const getUserProfileController = async (req: Request, res: Response) => {
  try {
    // Asegúrate de que req.user esté definido y contiene el id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Obtener el userId del objeto req.user
    const userId = req.user.id;

    // Llamar a la función para obtener el perfil del usuario
    const profile = await getUserProfile(userId);

    // Devolver la respuesta con los datos del perfil
    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};



