import * as jwt from 'jsonwebtoken';

interface JWTData {
  uid: number;
}

const signIn = async (data: JWTData) => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string): JWTData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'string') return 'INVALID_TOKEN';

    return decoded as JWTData;
  } catch (error) {
    console.log(error);
    return 'INVALID_TOKEN';
  }
};

export const JWTSerivce = {
  signIn,
  verify
};
