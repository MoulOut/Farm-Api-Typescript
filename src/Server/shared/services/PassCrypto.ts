import { compare, genSalt, hash } from 'bcryptjs';

const SALT = 8;
const hashPassword = async (pass: string) => {
  const saltGenerator = await genSalt(SALT);

  return await hash(pass, saltGenerator);
};

const verifyPassword = async (pass: string, hashedPass: string) => {
  return await compare(pass, hashedPass);
};

export const PassCrypto = {
  hashPassword,
  verifyPassword,
};
