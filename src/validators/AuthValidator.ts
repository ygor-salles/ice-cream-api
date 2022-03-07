import * as yup from 'yup';

class AuthValidator {
  authValidation() {
    return yup.object().shape({
      email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
      password: yup.string().required('Senha é obrigatória'),
    });
  }
}

export { AuthValidator };
