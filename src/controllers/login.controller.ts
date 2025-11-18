import { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/responses.js";
import customerService from "../services/customer.service.js";

export const loginController = async (event: APIGatewayProxyEventV2) => {
  try {
    // En HTTP API v2, event.body sigue siendo string | null
    const body = JSON.parse(event.body || "{}");
    console.log("Login body:", body);

    const result = await customerService.login(body);

    return successResponse(200,result);
  } catch (error: any) {
    console.error("Login error:", error);
    return errorResponse(error.statusCode || 400, error.message || "Bad Request");
  }
};
