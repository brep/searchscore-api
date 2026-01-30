import { Router } from "express";
import * as personController from './person.controller.js';

const router = Router();

/**
 * @openapi
 * /api/person/search:
 *   get:
 *     tags:
 *       - Person
 *     summary: Get a sorted list of people scored according to relevance of query match
 *     description: Returns an array of people with a score and list of matching fields based on a substring search, sorted descending by score.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Substring to search for in people’s data
 *     responses:
 *       200:
 *         description: A JSON array of matched people with scores and match details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The person’s name
 *                   score:
 *                     type: number
 *                     description: Relevance score of the match
 *                   matches:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of fields that matched the query
 *                 required:
 *                   - name
 *                   - score
 *                   - matches
 */
router.get('/search', personController.search);

export default router;