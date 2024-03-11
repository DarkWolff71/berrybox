import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import Redis from "ioredis";

const dynamoDBClient = new DynamoDBClient({ region: "ap-south-1" });

const redisClient = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT),
  tls: {},
});

redisClient.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const articleId = event.queryStringParameters?.id;

  if (!articleId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Article ID is required as a query parameter.",
      }),
    };
  }

  try {
    let articleData = await redisClient.get(articleId);

    if (articleData) {
      return { statusCode: 200, body: JSON.stringify({ data: articleData }) };
    } else {
      const dynamoResponse = await dynamoDBClient.send(
        new GetItemCommand({
          TableName: "ArticlesTable",
          Key: { id: { S: articleId } },
        })
      );

      if (dynamoResponse.Item) {
        const articleObject = unmarshall(dynamoResponse.Item);
        articleData = JSON.stringify(articleObject);
        await redisClient.set(articleId, articleData);

        return {
          statusCode: 200,
          body: JSON.stringify({ data: articleData }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Article not found." }),
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
