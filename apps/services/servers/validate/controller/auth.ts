import { Request, Response } from 'express';
import { hashToken, hasRequiredCookies, getUserDataFromRedis } from '../utils/validate';

/**
 * @swagger
 * /validate:
 *   post:
 *     summary: Validates the access and refresh tokens from cookies
 *     description: Validates the tokens and returns user data if valid.
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Access token for the user
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Refresh token for the user
 *     responses:
 *       200:
 *         description: Tokens are valid, and user data is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token validation successful
 *                 user:
 *                   type: object
 *                   example: { id: 123, name: "John Doe" }
 *       401:
 *         description: Unauthorized access, tokens are missing or invalid.
 *       500:
 *         description: Internal server error.
 */
const validateController = async (req: Request, res: Response): Promise<Response> => {
  if (!hasRequiredCookies(req?.cookies)) {
    return res?.status(401).json({ error: 'Access or refresh token is missing' });
  }

  try {
    const hashedAccessToken = hashToken(req.cookies.accessToken);
    const hashedRefreshToken = hashToken(req.cookies.refreshToken);

    const [userDataAccess, userDataRefresh] = await getUserDataFromRedis(hashedAccessToken, hashedRefreshToken);

    if (!userDataAccess || !userDataRefresh) {
      return res.status(401).json({ error: 'Invalid or expired tokens' });
    }

    // Token validation successful
    return res.status(200).json({ message: 'Token validation successful', user: JSON.parse(userDataAccess) });
  } catch (error) {
    console.error('Error validating tokens:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default validateController;
