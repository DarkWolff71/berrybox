import Redis from "ioredis";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const redisClient = new Redis({
  host: "berrybox-2wma20.serverless.aps1.cache.amazonaws.com",
  port: 6379,
  tls: {},
});

export const handler: APIGatewayProxyHandlerV2 = async () => {
  try {
    await redisClient.flushall();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Cache cleared successfully." }),
    };
  } catch (error) {
    console.error("Error clearing cache:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to clear cache due to internal server error.",
      }),
    };
  }
};
