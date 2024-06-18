import swaggerJSDoc from 'swagger-jsdoc';
import config from './config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Validate API',
    version: '1.0.0',
    description: 'This is the API documentation for the Validate Microservice.',
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}/`,
      description: 'Development server',
    },
  ],
  // ... You can add other global level definitions here
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions (e.g., your route files)
  apis: [
    '../../apps/services/servers/**/*.ts',
    '!../../apps/services/servers/**/node_modules/**', // Exclude node_modules within ./services/server/
    './**/*.ts',
    '!./node_modules/**', // Exclude node_modules
    '!./dist/**', // Exclude dist folder
    '!./build/**', // Exclude build folder
    '!**/*.d.ts', // Exclude TypeScript definition files
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
