import swaggerJSDoc from 'swagger-jsdoc';
import confg from './config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User MS API',
    version: '1.0.0',
    description: 'This is the REST API for the User Microservice',
  },
  servers: [
    {
      url: `http://localhost:${confg.PORT}`,
      description: 'Development server',
    },
  ],

  // you can add other global level definitions her
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    './**/*.ts', // Include all TypeScript files
    '!./node_modules/**', // Exclude node_modules
    '!./dist/**', // Exclude dist folder
    '!./build/**', // Exclude build folder
    '!**/*.d.ts', // Exclude TypeScript definition files
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
