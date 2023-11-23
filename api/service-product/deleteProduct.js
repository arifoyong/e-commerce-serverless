import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { nameToSkFormat } from "../libs/utils";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      pk: "product",
      sk: `p#${nameToSkFormat(event.pathParameters.name)}`
    }
  };
  await dynamoDb.delete(params);
  return { status: true };
});