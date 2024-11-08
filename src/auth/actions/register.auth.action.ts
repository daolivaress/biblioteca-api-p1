import { userModel } from '../../user/user.model';

export async function register(name: string, email: string, hashedPassword: string) {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return { error: 'El correo electrónico ya está registrado' };
  };

  try {
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    return { message: 'Usuario registrado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error del servidor al registrar el usuario' };
  };
};