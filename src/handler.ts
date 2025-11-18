import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import router from "./src/router/customer.router";
import { errorResponse } from "./src/utils/responses";

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
