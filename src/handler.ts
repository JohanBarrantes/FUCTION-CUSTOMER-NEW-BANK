import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import router from "./router/customer.router.js";
import { errorResponse } from "./utils/responses.js";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  console.log("Event received:", JSON.stringify(event));

  try {
    return await router(event);
  } catch (error: any) {
    console.error("Handler error:", error);
    return errorResponse(500, "Internal Server Error");
  }
};
