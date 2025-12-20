// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BrownElixir - API Server Docs",
      version: "1.0.0",
      description: "BrownElixir API Server documentation",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
        ApiSecretAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-secret",
        },
      },
    },

    // 🔐 Apply globally (JWT + API Key + Secret)
    security: [
      {
        bearerAuth: [],
        ApiKeyAuth: [],
        ApiSecretAuth: [],
      },
    ],
  },

  apis: [
    "./routes/*.js",
    "./models/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
