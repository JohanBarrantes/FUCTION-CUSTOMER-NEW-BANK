import { APIGatewayProxyEvent } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/responses";
import customerService from "../services/customer.service";

export const loginController = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");
    console.log(body)
    const result = await customerService.login(body);

    return successResponse(result);
  } catch (error: any) {
    return errorResponse(error.statusCode || 400, error.message);
  }
};
