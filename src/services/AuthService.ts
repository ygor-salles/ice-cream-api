import 'dotenv/config';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IAuthenticateRequest } from '../interfaces/IAuthenticateRequest';

class AuthService {
  async execute({ email, password }: IAuthenticateRequest) {
    const connectUser = getCustomRepository(UserRepository);

    // Verificar se email existe
    const user = await connectUser.findOne({ email });

    if (!user) {
      return { status: 400, message: 'Credenciais incorretas!' };
    }

    // Verificar se a senha está correta
    const isMatchPassword = await compare(password, user.password);

    if (!isMatchPassword) {
      return { status: 400, message: 'Credenciais incorretas!' };
    }

    const token = sign(
      {
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: process.env.TOKEN_EXPIRE || '1d',
      },
    );

    return { token };
  }
}

export { AuthService };
