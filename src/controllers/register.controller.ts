import { APIGatewayProxyEvent } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/responses";
import customerService from "../services/customer.service";

export const registerController = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const result = await customerService.register(body);

    return successResponse(result);
  } catch (error: any) {
    return errorResponse(error.statusCode || 400, error.message);
  }
};
