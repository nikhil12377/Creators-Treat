import { Request, Response } from 'express';
import InstagramAuth from '@creators/platforms/instagram/auth';
import config from '../../config';

// create an instance of InstagramAuth
const instagram = new InstagramAuth(
  config.INSTAGRAM_APP_ID,
  config.INSTAGRAM_APP_SECRET,
  config.INSTAGRAM_CALLBACK_URL,
);

/**
 * @swagger
 * /auth/connect/instagram:
 *  get:
 *  summary: Initiates the Instagram login process.
 *  description: Redirects the user to the Instagram login page to start the authentication process.
 *  responses:
 *  302:
 *   description: Redirect to the Instagram login Page.
 */

export const instagramInitialLogin = async (req: Request, res: Response) => {
  try {
    const loginUrl = instagram.getLoginUrl();
    res.redirect(loginUrl);
  } catch (error) {
    res.status(500).json({ error });
  }
};
/**
 * @swagger
 * /auth/connect/instagram/callback:
 *   get:
 *     summary: Callback endpoint for Instagram login
 *     description: Handles the callback from Instagram after user authentication, and processes user data in db
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: The authorization code received from Instagram
 *         schema:
 *           $ref: '#/components/schemas/InstagramAccessTokenResponse'
 *     responses:
 *       '302':
 *         description: Redirects to the status/home page after successful authentication
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     InstagramAccessTokenResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Page ID
 *         name:
 *           type: string
 *           description: Page name
 *         access_token:
 *           type: string
 *           description: Access token for the page
 *         instagram_business_account:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Instagram business account ID
 *         connected_instagram_account:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Connected Instagram account ID
 *         instagram_accounts:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Connected Instagram account ID
 *         business:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Business ID
 *             name:
 *               type: string
 *               description: Business name
 *         can_post:
 *           type: boolean
 *           description: Indicates if the page can post
 *         category:
 *           type: string
 *           description: Page category
 *         category_list:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Category ID
 *               name:
 *                 type: string
 *                 description: Category name
 *         is_community_page:
 *           type: boolean
 *           description: Indicates if the page is a community page
 *         rating_count:
 *           type: integer
 *           description: Page rating count
 *         verification_status:
 *           type: string
 *           description: Page verification status
 *         link:
 *           type: string
 *           description: Page link
 *         followers_count:
 *           type: integer
 *           description: Page followers count
 *         fan_count:
 *           type: integer
 *           description: Page fan count
 *         picture:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 height:
 *                   type: integer
 *                   description: Picture height
 *                 is_silhouette:
 *                   type: boolean
 *                   description: Indicates if the picture is a silhouette
 *                 url:
 *                   type: string
 *                   description: Picture URL
 *                 width:
 *                   type: integer
 *                   description: Picture width
 *         posts:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   created_time:
 *                     type: string
 *                     format: date-time
 *                     description: Post creation time
 *                   message:
 *                     type: string
 *                     description: Post message
 *                   id:
 *                     type: string
 *                     description: Post ID
 *             paging:
 *               type: object
 *               properties:
 *                 cursors:
 *                   type: object
 *                   properties:
 *                     before:
 *                       type: string
 *                       description: Cursor for fetching previous results
 *                     after:
 *                       type: string
 *                       description: Cursor for fetching next results
 *         photos:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   created_time:
 *                     type: string
 *                     format: date-time
 *                     description: Photo creation time
 *                   id:
 *                     type: string
 *                     description: Photo ID
 *             paging:
 *               type: object
 *               properties:
 *                 cursors:
 *                   type: object
 *                   properties:
 *                     before:
 *                       type: string
 *                       description: Cursor for fetching previous results
 *                     after:
 *                       type: string
 *                       description: Cursor for fetching next results
 *         published_posts:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   created_time:
 *                     type: string
 *                     format: date-time
 *                     description: Post creation time
 *                   message:
 *                     type: string
 *                     description: Post message
 *                   id:
 *                     type: string
 *                     description: Post ID
 *             paging:
 *               type: object
 *               properties:
 *                 cursors:
 *                   type: object
 *                   properties:
 *                     before:
 *                       type: string
 *                       description: Cursor for fetching previous results
 *                     after:
 *                       type: string
 *                       description: Cursor for fetching next results
 *         feed:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   created_time:
 *                     type: string
 *                     format: date-time
 *                     description: Post creation time
 *                   message:
 *                     type: string
 *                     description: Post message
 *                   id:
 *                     type: string
 *                     description: Post ID
 *             paging:
 *               type: object
 *               properties:
 *                 cursors:
 *                   type: object
 *                   properties:
 *                     before:
 *                       type: string
 *                       description: Cursor for fetching previous results
 *                     after:
 *                       type: string
 *                       description: Cursor for fetching next results
 *         settings:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   setting:
 *                     type: string
 *                     description: Setting name
 *                   value:
 *                     type: string
 *                     description: Setting value
 *   responses:
 *     302:
 *       description: Redirects to the status/home page after successful authentication.
 *     500:
 *       description: Internal server error.
 */
export const instagramCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      res.status(400).send('Code is required for Instagram Authentication');
    }

    // get userAccessToken for getting the pageAccessToken
    const userAccessToken = await instagram.getUserAccessToken(code as string);

    // get pageAccessToken to access full userProfile also pageAccessToken will allowing to upload media on platforms
    const pageAccessToken = await instagram.getPageAccessToken(userAccessToken);

    const userData = await instagram.getInstagramUserProfile(pageAccessToken);

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error });
  }
};
