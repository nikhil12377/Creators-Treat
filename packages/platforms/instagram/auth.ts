import api from './utils/axios';
import {
  INSTAGRAM_OAUTH_URL,
  INSTAGRAM_ACCESS_TOKEN_URL,
  INSTAGRAM_USER_DATA_URL,
  INSTAGARM_PERMISSIONS,
  INSTAGRAM_FEILDS,
} from './utils/constants';
import { AccessTokenError, PageAccessTokenError, UserDataError } from './utils/error';


class InstagramAuth {
  private appId: string;
  private appSecret: string;
  private redirectURI: string;

  constructor(appId: string, appSecret: string, redirectURI: string) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.redirectURI = redirectURI;
  }

  // Get the Instagram login URL
  public getLoginUrl(): string {
    const scopeParam = INSTAGARM_PERMISSIONS.join(',');
    const extras = JSON.stringify({ setup: { channel: 'IG_API_ONBOARDING' } });
    return `${INSTAGRAM_OAUTH_URL}?client_id=${this.appId}&display=page&extras=${encodeURIComponent(extras)}&redirect_uri=${this.redirectURI}&scope=${scopeParam}`;
  }

  // Get the long-lived User access token that will never expire
  public async getUserAccessToken(code: string): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.appId,
      client_secret: this.appSecret,
      code,
      redirect_uri: this.redirectURI,
    });
    try {
      const response = await api.get(`${INSTAGRAM_ACCESS_TOKEN_URL}?${params.toString()}`);
      return response?.data?.access_token;
    } catch (error) {
      throw new AccessTokenError(`Failed to get access token: ${error}`);
    }
  }

  // Get the Instagram Page-Access-Token
  public async getPageAccessToken(userAccessToken: string) {
    const params = new URLSearchParams({
      fields: 'access_token',
      access_token: userAccessToken,
    });

    try {
      const response = await api.get(`${INSTAGRAM_USER_DATA_URL}/accounts?${params.toString()}`);
      return response?.data?.data?.[0]?.access_token;
    } catch (error) {
      throw new PageAccessTokenError(`Failed to get page access token: ${error}`);
    }
  }

  // Get the Instagram user data
  public async getInstagramUserProfile(accessToken: string) {
    const fieldsParam = INSTAGRAM_FEILDS.join(',');

    const params = new URLSearchParams({
      fields: fieldsParam,
      access_token: accessToken,
    });

    try {
      const response = await api.get(`${INSTAGRAM_USER_DATA_URL}?${params.toString()}`);
      return response?.data;
    } catch (error) {
      throw new UserDataError(`Failed to fetch Instagram user data: ${error}`);
    }
  }
}

export default InstagramAuth;
