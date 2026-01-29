import { Router } from "express";
import type { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from '../../swagger/swagger.js';

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Hello World!!
 *     responses:
 *       200:
 *         description: Returns a magic string.
 */
router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification, {
    explorer: true, // enables search bar
  })
);

export default router;