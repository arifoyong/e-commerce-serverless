import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "pk=:pk and sk=:name",
    ExpressionAttributeValues: {
      ":pk": "product",
      ":name": `p#${event.pathParameters.name.toLowerCase()}`,
    },
  };
  const result = await dynamoDb.query(params);
  return result.Items;
});