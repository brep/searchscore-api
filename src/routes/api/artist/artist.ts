import { Router } from "express";
import * as artistController from "./artist.controller.js";
const router = Router();

/**
 * @openapi
 * /api/artist:
 *   post:
 *     summary: Create a new artist
 *     description: Creates an artist if an artist with the same name does not already exist in the specified genre.
 *     tags:
 *       - Artist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - genre
 *             properties:
 *               name:
 *                 type: string
 *                 example: Radiohead
 *               genre:
 *                 type: string
 *                 example: Alternative Rock
 *     responses:
 *       201:
 *         description: Artist successfully created
 *       409:
 *         description: Artist with the given name already exists in the specified genre
 */
router.post('/', artistController.add);

export default router;