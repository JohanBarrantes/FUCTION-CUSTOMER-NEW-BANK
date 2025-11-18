// src/router/customer.router.ts
import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { successResponse, errorResponse } from "../utils/responses.js";

// Router para HTTP API v2
const router = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
  console.log("Customer router event:", event);

  // Verificar método y ruta
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  if (method === "POST" && path === "/customer") {
    if (!event.body) return errorResponse(400, "Missing body");

    try {
      const body = JSON.parse(event.body);
      console.log("Parsed body:", body);

      // Aquí iría tu lógica real, ejemplo:
      const result = {
        message: "Customer processed successfully",
        customerId: body.customerId,
        action: body.action,
      };

      return successResponse(200, result);
    } catch (e) {
      console.error("JSON parse error:", e);
      return errorResponse(400, "Invalid JSON");
    }
  }

  // Ruta no encontrada
  return errorResponse(404, "Route not found");
};

export default router;
