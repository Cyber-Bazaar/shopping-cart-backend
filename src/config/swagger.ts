import swaggerJsDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Shopping Cart API",
      version: "1.0.0",
      description: "Shopping Cart Backend",
    },
  },
  apis: ["./src/docs/*.yaml"],
};

const specs = swaggerJsDoc(options);

export default specs;
