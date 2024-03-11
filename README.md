
# BerryBox Assignment

## Tech Stack
- Language: TypeScript
- Frontend:
  * Framework: Next.js
  * UI libraries: Aceternity UI, Next UI, Tailwind CSS
- Backend:
  *  Framework: Serverless
  *  Database: DynamoDB
  *  Cache: Elasticache Redis
    

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (Preferably the latest LTS version)
- pnpm
- Serverless Framework (`npm install -g serverless`)

## Setup Instructions

### Clone the Repository

1. Clone the BerryBox repository to your local machine:

```
   git clone https://github.com/your-username/berrybox.git
   cd berrybox
```

2. ### Client Setup

1. Navigate to the client directory:
```
    cd client
```

2. Create an environment file and add the backend API URL:
```
    touch .env.local
    echo 'NEXT_PUBLIC_BACKEND_URL="https://a0ndo64qd7.execute-api.ap-south-1.amazonaws.com/getArticle"' > .env.local
```

3. Build and start the client application:
```
    pnpm run build
    pnpm run start
```

### Server Setup

1. Navigate to the server directory:
   ```
   cd ../server
   ```
3. Build the server application:
   ```
   pnpm run build
   ```
5. Deploy using Serverless Framework:
   ```
   sls deploy
   ```

## Usage

After the setup, you should have the client application running on your local machine and the server application deployed. You can interact with the client application through your web browser. Select a number between 1 and 100 and you can see the corresponding article.

## AWS Lamba Routes
-   GET - https://aqihcjmgac.execute-api.ap-south-1.amazonaws.com/getArticle
    Takes id as a query param, and looks for the article corresponding to the id in the cache. If cache hit, returns the result, and if cache miss, fetches the data from the DynamoDb, populates the cache, and then returns the result.

-   GET - https://aqihcjmgac.execute-api.ap-south-1.amazonaws.com/clearCache
    Clears the entire cache
