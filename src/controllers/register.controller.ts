import { errorResponse, successResponse } from "../utils/responses.js";
import customerService from "../services/customer.service.js";

export const registerController = async (body: any) => {
  try {
    console.log("Login body:", body);

    const data = {
      email: body.email,
      password: body.password,
      name: body.name,
      phone: body.phone
    };

    const result = await customerService.register(data);

    return successResponse(200, result);
  } catch (error: any) {
    console.error("Login error:", error);
    return errorResponse(error.statusCode || 400, error.message || "Bad Request");
  }
};
