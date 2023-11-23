// import * as uuid from 'uuid';
import handler from '../libs/handler-lib.js';
import dynamoDb from '../libs/dynamodb-lib.js';
import { nameToSkFormat } from '../libs/utils.js';

export const main = handler( async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            pk: "product",
            sk: `p#${nameToSkFormat(data.name)}`,
            userId: event.requestContext.identity.cognitoIdentityId,
            name: data.name,
            category: data.category,
            option: data.option,
            weight: data.weight,
            featured: data.featured,
            description: data.description,
            package: data.package,
            price: data.price,
            pictures: data.pictures,
            profile: data.profile,
            createdDate: Date.now(),
        }
    };
    await dynamoDb.put(params);
});