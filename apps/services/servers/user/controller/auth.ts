import { Request, Response } from 'express';
import MetaAuth from '@creators/platforms/Meta/auth';
import IFacebookUserProfile from '../utils/authTypes';
import User from '../models/user';
import { setAuthenticationToken } from '../utils/authUtils';
import config from '../config';

// find user if already exists otherwise create new user in db
const findOrCreateUser = async (userProfile: IFacebookUserProfile) => {
  try {
    const user = await User.findOrCreateUser({
      loginId: userProfile.id,
      username: userProfile.email.split('@')[0],
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      email: userProfile.email,
      gender: userProfile.gender,
      dateOfBirth: userProfile.birthday,
      preferredLanguage: (userProfile.languages && userProfile.languages[0]?.name) || 'en',
      location: {
        city: userProfile.location?.name?.split(',')[0],
        state: userProfile.location?.name?.split(',')[1],
      },
      profilePicture: userProfile.picture?.data.url,
      isEmailVerified: true,
    });
    return user;
  } catch (error) {
    throw new Error(`Error in creating user: ${error}`);
  }
};

const facebook = new MetaAuth(
  config.FACEBOOK_APP_ID,

  config.FACEBOOK_APP_SECRET,

  config.FACEBOOK_CALLBACK_URL,
);

/**
 * @swagger
 * /auth/login/facebook:
 *   get:
 *     summary: Initiates the Facebook login process.
 *     description: Redirects the user to the Facebok login page to start the authentication process.
 *     responses:
 *       302:
 *         description: Redirect to the Facebook login Page.
 */
export const facebookInitialLogin = async (req: Request, res: Response) => {
  try {
    // get the login URL for Facebook
    const loginURL = await facebook.getLoginURL();
    res.redirect(loginURL);
  } catch (error) {
    res.status(500).send('An error occured during Facebook Authentication');
  }
};

/**
 * @swagger
 * /auth/callback/facebook:
 *   get:
 *     summary: Callback endpoint for Facebook login.
 *     description: Handles the callback from Facebook after user authentication, and processes user data in db.
 *   parameters:
 *     - in: query
 *       name: fbUserProfile
 *       required: true
 *       description: User profile data received from Facebook.
 *       schema:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           first_name:
 *             type: string
 *           last_name:
 *             type: string
 *           email:
 *             type: string
 *           gender:
 *             type: string
 *           birthday:
 *             type: string
 *           link:
 *             type: string
 *           picture:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   height: string
 *                   width: string
 *                   url: string
 *                   is_silhouette: string
 *           languages:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id: string
 *                 name: string
 *           is_guest_user:
 *             type: boolean
 *             default: false
 *           location:
 *             type: object
 *             properties:
 *               id: string
 *               name: string
 *   responses:
 *     302:
 *       description: Redirects to the status/home page after successful authentication.
 *     500:
 *       description: Internal server error.
 */
export const facebookLoginCallback = async (req: Request, res: Response) => {
  try {
    // get the code from query params after initial login
    const { code } = req.query;
    if (!code) {
      res.status(400).send('Code is required for Facebook Authentication');
    }

    // getting access-token from facebook
    const facebookAccessToken = await facebook.getAccessToken(code as string);

    // extract profile from facebook using access-token
    const facebookUserProfile = await facebook.getUserProfile(facebookAccessToken);

    // find or create or update user in db
    const user = await findOrCreateUser(facebookUserProfile as IFacebookUserProfile);

    // Generate and set accessToken and refreshToken in redis
    const { accessToken, refreshToken } = await setAuthenticationToken(user.id);

    // return status and tokens in response
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send('An error occured during Facebook Authentication from callback');
  }
};
