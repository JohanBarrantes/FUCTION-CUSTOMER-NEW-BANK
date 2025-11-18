import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
const client = new DynamoDBClient({});
const doc = DynamoDBDocumentClient.from(client);

const TABLE = process.env.CUSTOMER_TABLE || "newbank-customers-dev";

class CustomerRepository {
  async getByEmail(email: string) {
    const cmd = new GetCommand({
      TableName: TABLE,
      Key: { email },
    });

    const result = await doc.send(cmd);
    return result.Item;
  }

async create(user: { email: string; password: string }) {
  const newUser = {
    customerId: crypto.randomUUID(),   // PK REAL
    email: user.email,
    password: user.password,
    createdAt: new Date().toISOString(),
  };

  await doc.send(
    new PutCommand({
      TableName: TABLE,
      Item: newUser,
    })
  );

  return newUser;
}

}

export default new CustomerRepository();
