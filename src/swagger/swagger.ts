import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Search Score API',
      version: '1.0.0',
    },
  },
  apis: ['./dist/routes/**/*.js']
};

const openapiSpecification = swaggerJsDoc(options);

export default openapiSpecification;