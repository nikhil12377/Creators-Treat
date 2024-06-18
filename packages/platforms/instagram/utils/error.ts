class InstagramAuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InstagramAuthError';
    }
}

export class AccessTokenError extends InstagramAuthError {
    constructor(message: string) {
        super(message);
        this.name = 'AccessTokenError';
    }
}

export class PageAccessTokenError extends InstagramAuthError {
    constructor(message: string) {
        super(message);
        this.name = 'PageAccessTokenError';
    }
}

export class UserDataError extends InstagramAuthError {
    constructor(message: string) {
        super(message);
        this.name = 'UserDataError';
    }
}