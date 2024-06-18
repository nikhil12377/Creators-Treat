import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

export default ({ app, swaggerSpec }: { app: Application, swaggerSpec: object }) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve Swagger JSON at /api-docs/json
  app.get('/api-docs/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
