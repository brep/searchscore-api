import { Router } from "express";
import type { Request, Response } from 'express';

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
router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default router;