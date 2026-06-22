import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Query Master API",

      version: "1.0.0",

      description: "Enterprise Query Management Platform",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },

  apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
