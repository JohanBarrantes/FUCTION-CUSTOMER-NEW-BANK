import { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/responses.js";
import customerService from "../services/customer.service.js";

export const loginController = async (event: APIGatewayProxyEventV2) => {
  try {
    const body = JSON.parse(event.body || "{}");
    console.log("Login body:", body);
        const data = {
        email: body.email,
        password: body.password,
        name:body.name,
        phone:body.phone
      };
    const result = await customerService.register(data);
return {
    statusCode:200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: result,
  };  } catch (error: any) {
    console.error("Login error:", error);
    return errorResponse(error.statusCode || 400, error.message || "Bad Request");
  }
};
