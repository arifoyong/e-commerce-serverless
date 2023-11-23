import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { nameToSkFormat } from "../libs/utils";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      pk: "product",
      sk: `p#${nameToSkFormat(event.pathParameters.name)}`
    },
    UpdateExpression: "SET category=:category, description=:description, package=:package, pictures=:pictures, price=:price, profile=:profile, option=:option, weight:=weight, featured:=featured",
    ExpressionAttributeValues: {
      ":category": data.category || null,
      ":description": data.description || null,
      ":package": data.package || null,
      ":pictures": data.pictures || null,
      ":price": data.price || null,
      ":profile": data.profile || null,
      ":option": data.option || null,
      ":weight": data.weight || null,
      ":featured": data.featured || null
    },
    ReturnValues: "ALL_NEW"
  };
  await dynamoDb.update(params);
  return { status: true };
});