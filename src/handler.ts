import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import router from "./router/customer.router.js";
import { errorResponse } from "./utils/responses.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  console.log("Event received:", JSON.stringify(event));

  if (event.requestContext.http.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  try {
    const response = await router(event);
    return {
      ...response,
      headers: {
        ...(response.headers || {}),
        ...corsHeaders,
      },
    };
  } catch (error: any) {
    console.error("Handler error:", error);

    const resp = errorResponse(500, "Internal Server Error");
    return {
      ...resp,
      headers: {
        ...(resp.headers || {}),
        ...corsHeaders,
      },
    };
  }
};
