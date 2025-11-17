import { APIGatewayProxyEvent } from "aws-lambda";

import { errorResponse } from "../utils/responses";
import { loginController } from "../controllers/login.controller";
import { registerController } from "../controllers/register.controller";

export default async function router(event: APIGatewayProxyEvent) {
  const path = event.path;
  const method = event.httpMethod;

  if (path.endsWith("/login") && method === "POST") {
    return loginController(event);
  }

  if (path.endsWith("/register") && method === "POST") {
    return registerController(event);
  }

  return errorResponse(404, "Route not found");
}
