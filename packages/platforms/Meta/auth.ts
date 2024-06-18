import axios from './utils/axios';
import { FACEBOOK_OAUTH_URL, FACEBOOK_ACCESS_TOKEN_URL, FACEBOOK_USER_DATA_URL, FACEBOOK_PERMISSIONS, FACEBOOK_FIELDS } from './utils/constants';

class MetaAuth {
  private appId: string;

  private appSecret: string;

  private redirectURI: string;

  constructor(appId: string, appSecret: string, redirectURI: string) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.redirectURI = redirectURI;
  }

  // Get the login URL for the user to authenticate with Facebook
  async getLoginURL(): Promise<string> {
    const scopeParams = FACEBOOK_PERMISSIONS.join(',');
    return `${FACEBOOK_OAUTH_URL}?client_id=${this.appId}&redirect_uri=${this.redirectURI}&scope=${scopeParams}`;
  }

  // Get the access token from the code returned by Facebook
  async getAccessToken(code: string): Promise<string> {
    try {
      const url = `${FACEBOOK_ACCESS_TOKEN_URL}?client_id=${this.appId}&redirect_uri=${this.redirectURI}&client_secret=${this.appSecret}&code=${code}`;
      const response = await axios.get(url);
      return response?.data?.access_token;
    } catch (err) {
      throw new Error(`Error getting access token': ${err}`);
    }
  }

  // Get the user profile data from the access token
  async getUserProfile(accessToken: string): Promise<object> {
    try {
      const fieldsParams = FACEBOOK_FIELDS.join(',');

      // bind this to the current instance of the class
      this.getUserProfile.bind(this);

      const response = await axios.get(`${FACEBOOK_USER_DATA_URL}`, {
        params: {
          fields: fieldsParams,
          access_token: accessToken,
        },
      });
      return response?.data;
    } catch (err) {
      throw new Error(`Error getting user data': ${err}`);
    }
  }
}

export default MetaAuth;
