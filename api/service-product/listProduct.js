import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  console.log('MyEvent:', event);
  console.log('MyData:', data);
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": `product`
    },
    ExclusiveStartKey: data.lastEvaluatedKey,
    Limit: data.limit
  };
  const result = await dynamoDb.query(params);
  return result;
});