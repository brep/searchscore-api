import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Search Score API',
      version: '1.0.0',
    },
  },
  apis: ['./dist/index.js'],
  //apis: ['./dist/routes*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

export default openapiSpecification;