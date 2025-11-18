import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { successResponse, errorResponse } from "../utils/responses.js";
import { loginController } from "../controllers/login.controller.js";

const router = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  console.log("Customer router event:", event);

  const method = event.requestContext.http.method;
  const path = event.rawPath;

  if (method === "POST" && path === "/registrationUser") {
    if (!event.body) return errorResponse(400, "Missing body");

    try {
      const body = JSON.parse(event.body);
      return loginController(body);  // ⬅ PASAMOS SOLO EL BODY
    } catch (e) {
      console.error("JSON parse error:", e);
      return errorResponse(400, "Invalid JSON");
    }
  }

  return errorResponse(404, "Route not found");
};

export default router;
