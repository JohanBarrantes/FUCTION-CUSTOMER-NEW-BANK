import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export const signJWT = (payload: object): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};
