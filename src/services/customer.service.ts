import customerRepo from "../repositories/customer.repo";
import { LoginPayload, RegisterPayload } from "../types/customer.types";
import { signJWT } from "../utils/jwt";
import bcrypt from "bcryptjs";

class CustomerService {

  async login(payload: LoginPayload) {
    const user = await customerRepo.getByEmail(payload.email);

    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }

    const valid = await bcrypt.compare(payload.password, user.password);
    if (!valid) {
      throw { statusCode: 401, message: "Invalid credentials" };
    }

    const token = signJWT({ userId: user.userId, email: user.email });

    return { token };
  }

  async register(payload: RegisterPayload) {
    console.log("CutomerService.register")
    const exists = await customerRepo.getByEmail(payload.email);
    if (exists) {
      throw { statusCode: 400, message: "User already exists" };
    }

    const hashed = await bcrypt.hash(payload.password, 10);

    const created = await customerRepo.create({
      email: payload.email,
      password: hashed,
    });

    return { userId: created.userId };
  }
}

export default new CustomerService();
