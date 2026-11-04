import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: string;
};

const getSecret = (secret: string | undefined, name: string): string => {
  if (!secret) {
    throw new Error(`${name} is not configured`);
  }

  return secret;
};

export const createAccessToken = (userId: string): string =>
  jwt.sign({ userId }, getSecret(process.env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET"), {
    expiresIn: "15m",
  });

export const createRefreshToken = (userId: string): string =>
  jwt.sign({ userId }, getSecret(process.env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET"), {
    expiresIn: "7d",
  });

export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(
    token,
    getSecret(process.env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET")
  ) as TokenPayload;

export const verifyRefreshToken = (token: string): TokenPayload =>
  jwt.verify(
    token,
    getSecret(process.env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET")
  ) as TokenPayload;
