export const FACEBOOK_BASE_URL = 'https://graph.facebook.com/v19.0/';
export const FACEBOOK_OAUTH_URL = `https://www.facebook.com/v19.0/dialog/oauth`;
export const FACEBOOK_ACCESS_TOKEN_URL = `oauth/access_token`;
export const FACEBOOK_USER_DATA_URL = `me`;

export const FACEBOOK_FIELDS = [
    'id',
    'first_name',
    'last_name',
    'email',
    'gender',
    'birthday',
    'languages',
    'picture',
    'location',
    'photos',
    'posts',
    'events',
    'videos',
];

export const FACEBOOK_PERMISSIONS = [
    'public_profile',
    'email',
    'user_gender',
    'user_birthday',
    'user_link',
    'user_location',
    'user_photos',
    'user_posts',
    'user_events',
    'user_videos',
];