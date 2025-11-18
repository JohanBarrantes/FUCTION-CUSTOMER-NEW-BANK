import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { successResponse, errorResponse } from "../utils/responses.js";
import { loginController } from "../controllers/login.controller.js";
import { registerController } from "../controllers/register.controller.js";

const router = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  console.log("Customer router event:", event);

  const method = event.requestContext.http.method;
  const path = event.rawPath;
if (!event.body) return errorResponse(400, "Missing body")
  if (method === "POST" && path === "/registrationUser") {
    
    try {
      const body = JSON.parse(event.body);
      return registerController(body);
    } catch (e) {
      console.error("JSON parse error:", e);
      return errorResponse(400, "Invalid JSON");
    }
  }else if(method === "POST" && path === "/sessionUser"){
try {
      const body = JSON.parse(event.body);
      return loginController(body);
    } catch (e) {
      console.error("JSON parse error:", e);
      return errorResponse(400, "Invalid JSON");
    }
  }
  return errorResponse(404, "Route not found");
};

export default router;
