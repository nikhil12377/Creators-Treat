import { Request, Response } from 'express';
import { produceDataToKafka } from '../loaders/kafka';
import Media from "../models/Media";
import { getUserIDFromRedis, hashToken } from '../utils/upload';
import logger from "@creators/logger";

/**
 * @swagger
 * /scheduleMedia:
 *   post:
 *     summary: Upload media to the platforms.
 *     description: This endpoint allows you to upload user content to various platforms.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               platforms:
 *                 type: array
 *                 description: List of platforms to share the media.
 *                 items:
 *                   type: string
 *               content:
 *                 type: string
 *                 description: Media content to be uploaded.
 *               cost:
 *                 type: number
 *                 description: Cost associated with the media upload.
 *               time:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp indicating when the media was uploaded.
 *               userID:
 *                 type: string
 *                 description: User ID associated with the media upload.
 *     responses:
 *       200:
 *         description: Media successfully uploaded.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: Media uploaded successfully.
 *       400:
 *         description: Bad Request - Invalid input provided.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Invalid input provided.
 *       500:
 *         description: Internal Server Error - Failed to process the request.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error.
 */
const scheduleMedia = async (req: Request, res: Response) => {
    try {
        const platforms = req?.body?.platforms;
        const content = req?.body?.content;
        const cost = req?.body?.cost;
        const time = req?.body?.time;

        const hashedAccessToken = hashToken(req.cookies.accessToken);
        const userID = await getUserIDFromRedis(hashedAccessToken);

        if (!userID) {
            return res.status(400).json({
                message: "Invalid or missing user ID.",
            });
        }

        if (!time) {
            return res.status(400).json({
                message: "Invalid or missing 'time' parameter in the request body.",
            });
        }

        if (!Array.isArray(platforms)) {
            return res.status(400).json({
                message: "'platforms' must be an array in the request body.",
            });
        }

        if (!Array.isArray(content)) {
            return res.status(400).json({
                message: "'content' must be an array in the request body.",
            });
        }

        // Adding entry of every content with every platform
        await Media.createBulkMedia(platforms, content, userID, cost, time);

        const data = {
            platforms: platforms,
            content: content,
            cost: cost,
            time: time
        }

        await produceDataToKafka("uploads", { data }, userID);
    }
    catch (error) {
        logger.error(error)
        res.status(500).json({ message: "Failed to schedule media to platforms" })
    }
}

export default scheduleMedia;