# Wallet Service

This project is a wallet service application built with Node.js and PostgreSQL, containerized using Docker.

# Run Project using docker compose (solution 1)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Docker
- Docker Compose

## Getting Started

Follow these steps to get your development environment running:

1. **Clone the repository**

   ```bash
   git clone https://github.com/rezaamya/example_for_wallet_service.git
   cd example_for_wallet_service
   ```

2. **Set up environment variables**

   Create a `.env` file in the root directory of the project and add the following content:

   ```env
   # Application
   APP_PORT=4000

   # Database
   POSTGRES_HOST=wallet-service-db
   POSTGRES_PORT=5432
   POSTGRES_USER=walletuser
   POSTGRES_PASSWORD=walletpassword
   POSTGRES_DB=walletdb
   ```

   Feel free to change the values as needed, but ensure that `POSTGRES_HOST` matches the name of your database service in the Docker Compose file.

3. **Build and run the containers**

   Use Docker Compose to build and start the containers:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers. The `--build` flag ensures that Docker rebuilds the images if there are any changes.

4. **Accessing the application**

   Once the containers are up and running, you can access the application at:

   ```
   http://localhost:4000
   ```

   The PostgreSQL database will be accessible on your host machine at `localhost:5436`.

5. **Stopping the application**

   To stop the application and remove the containers, use:

   ```bash
   docker-compose down
   ```

## Development

For development purposes, you can use the following commands:

- To rebuild the containers: `docker-compose up --build`
- To start the containers in detached mode: `docker-compose up -d`
- To view logs: `docker-compose logs -f`
- To stop the containers without removing them: `docker-compose stop`
- To remove stopped containers: `docker-compose rm`

# Run using node.JS (solution 2)

If you want to run the project without using `docker-compose`, use following steps:

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)
- Docker (for running the PostgreSQL container)

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the repository**

   ```bash
   git clone https://github.com/rezaamya/example_for_wallet_service.git
   cd example_for_wallet_service
   ```

2. **Set up environment variables**

   Create a `.env` file in the root directory of the project and add the following content:

   ```env
   # Application
   APP_PORT=4000

   # Database
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5436
   POSTGRES_USER=walletuser
   POSTGRES_PASSWORD=walletpassword
   POSTGRES_DB=walletdb
   ```

   Adjust these values if your PostgreSQL container uses different settings.

3. **Install dependencies**

   Install the required npm packages:

   ```bash
   npm install
   ```

4. **Ensure PostgreSQL is running**

   Make sure your PostgreSQL container is running. If not, start it using:

   ```bash
   docker run -d --name wallet-postgres -e POSTGRES_USER=walletuser -e POSTGRES_PASSWORD=walletpassword -e POSTGRES_DB=walletdb -p 5436:5432 postgres:12.19-alpine3.20
   ```

   This command starts a PostgreSQL container with the settings specified in your `.env` file.

5. **Run the application**

   Start the application in development mode:

   ```bash
   npm run start:dev
   ```

   For production mode:

   ```bash
   npm run build
   npm run start:prod
   ```

   The application will be accessible at `http://localhost:4000`.

6. **Running tests**

   To run the unit tests:

   ```bash
   npm run test
   ```

   To run end-to-end tests:

   ```bash
   npm run test:e2e
   ```

   To run tests with coverage:

   ```bash
   npm run test:cov
   ```

## API Endpoints

GET Balance:

   ```bash
   curl --location 'localhost:4000/v1/balance?user_id=1'
   ```

Add/Subtract Money:

   ```bash
   curl --location 'localhost:4000/v1/money'  --header 'Content-Type: application/json'  --data '{ "user_id": 1, "amount": 50 }'
   ```

## Additional Notes

- Ensure that the PostgreSQL container is running before starting the application.
- The application uses port 4000 by default. Ensure this port is free on your system.
- For any changes in the database configuration, update both the `.env` file and the PostgreSQL container settings.

