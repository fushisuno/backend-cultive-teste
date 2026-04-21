import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cultive',
      version: '1.0.0',
    },
  },
  apis: ["./docs/*.js", "./routes/*.js"], // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec
