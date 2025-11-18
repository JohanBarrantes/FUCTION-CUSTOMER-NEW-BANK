// src/utils/responses.ts
import { APIGatewayProxyResult } from "aws-lambda";

export const successResponse = (statusCode: number, body: any): APIGatewayProxyResult => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const errorResponse = (statusCode: number, message: string): APIGatewayProxyResult => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ error: message }),
});
