import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import router from "./router/customer.router.js";
import { errorResponse } from "./utils/responses";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return await router(event);
  } catch (error: any) {
    console.error("Handler error:", error);
    return errorResponse(500, "Internal Server Error");
  }
};
