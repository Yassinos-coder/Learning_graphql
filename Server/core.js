require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { mongoose } = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import resolvers
const { signin, signup, getUser } = require('./Resolvers/userResolver');

// Load schema from .graphql file
const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'Graphql/userSchema.graphql'), 'utf8'));

// Define resolvers
const resolvers = {
    Query: {
        getUser: async (_, { id }) => getUser(id),  // Get user by ID
    },
    Mutation: {
        signin: async (_, { input }) => signin(input),  // Handle signin
        signup: async (_, { input }) => signup(input),  // Handle signup
    },
};

// Initialize Express app
const app = express();

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Database connection
const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {});
            console.info("Database connection successful");
            break;
        } catch (error) {
            retries -= 1;
            console.error("Database connection error:", error.message);
            console.info(`Retries left: ${retries}`);
            if (retries === 0) process.exit(1);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};
connectDB();

// Apply Apollo GraphQL middleware to Express
async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // Start the Express server
    app.listen(process.env.BACK_END, () => {
        console.log(`Server is running at http://localhost:${process.env.BACK_END}/graphql`);
    });
}

startServer();

// Graceful shutdown for SIGTERM and SIGINT
process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
});

process.on("SIGINT", async () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
});
