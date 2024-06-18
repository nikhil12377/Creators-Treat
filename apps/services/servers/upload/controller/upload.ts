import createS3Instance from '@creators/aws';
import { compressImage, transcodeVideo } from "@creators/compress";
import logger from "@creators/logger";
import { Request, Response } from 'express';
import fs from "fs";
import config from "../config";

/**
 * @swagger
 * /uploadMedia:
 *   post:
 *     summary: Upload and process media files
 *     description: This endpoint allows users to upload media files (images or videos), processes them by transcoding videos or compressing images, and then uploads the optimized file to an S3 bucket. The original file is deleted after processing.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: image/png
 *             properties:
 *               file:
 *                 type: file
 *     responses:
 *       200:
 *         description: File processed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: File processed successfully.
 *               path: /path/to/optimized_file.mp4
 *       400:
 *         description: |
 *           - No file uploaded.
 *           - Unsupported file type.
 *         content:
 *           application/json:
 *             example:
 *               error: No file uploaded.
 *       500:
 *         description: Error processing file.
 *         content:
 *           application/json:
 *             example:
 *               error: Error processing file.
 */
const uploadMedia = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }

  const inputPath = req.file.path;
  const outputPath = inputPath.replace(/(\.[\w\d_-]+)$/i, '_optimized$1');

  try {
    if (req.file.mimetype.startsWith('video/')) {
      await transcodeVideo(inputPath, outputPath);
    } else if (req.file.mimetype.startsWith('image/')) {
      await compressImage(inputPath, outputPath);
    } else {
      return res.status(400).send({ error: 'Unsupported file type.' });
    }

    // upload to s3
    const s3Instance = createS3Instance(config.AWS_ACCESS_KEY_ID, config.AWS_SECRET_ACCESS_KEY);
    s3Instance.uploadContent(outputPath, req.file.filename, config.AWS_BUCKET);

    return res.status(200).send({ message: 'File processed successfully.', path: outputPath });
  } catch (error) {
    logger.error(error);

    if (error.code === 'ENOENT') {
      return res.status(400).send({ error: 'File not found. Please upload a valid file.' });
    } else if (error.code === 'EPIPE') {
      return res.status(500).send({ error: 'Error writing to the output file.' });
    } else if (error.name === 'UnsupportedFileTypeError') {
      return res.status(400).send({ error: 'Unsupported file type. Only video and image files are supported.' });
    } else {
      return res.status(500).send({ error: 'Error processing file. Please try again later.' });
    }

  } finally {
    // Cleanup: delete the original file after processing
    fs.unlink(inputPath, (err) => {
      if (err) logger.error(err);
    });
  }
};


export default uploadMedia;