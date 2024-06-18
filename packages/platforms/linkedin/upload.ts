import axios, { AxiosError } from "axios";
import fs from "fs";
import { LIFECYCLE_STATE, SHARE_MEDIA_CATEGORY_ARTICLE, SHARE_MEDIA_CATEGORY_NONE, STATUS, VISIBILITY } from "./utils/constants";
class LinkedIn {
    baseURL: string;
    URN: string;
    accessToken: string;

    constructor(baseURL: string, accessToken: string, URN: string) {
        this.baseURL = baseURL;
        this.accessToken = accessToken;
        this.URN = URN;
    }

    setOptions({ newAccessToken }: { newAccessToken: string }) {
        this.accessToken = newAccessToken;
    }

    /**
    * Uploads text content.
    * @param text The text content to be uploaded.
    */
    async uploadText(text: string) {
        try {
            const data = {
                author: this.URN,
                lifecycleState: LIFECYCLE_STATE,
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: text
                        },
                        shareMediaCategory: SHARE_MEDIA_CATEGORY_NONE
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': VISIBILITY
                }
            };

            await axios.post(`${this.baseURL}/ugcPosts`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })
        } catch (error) {
            throw new Error(`LinkedIn API Error: ${error}`);
        }
    }

    /**
    * Uploads an article with a URL and a optional text.
    * @param text Optional text to accompany the article.
    * @param articleURL The URL of the article.
    */
    async uploadArtical(text: string, articleURL: string) {
        try {
            const data = {
                author: this.URN,
                lifecycleState: LIFECYCLE_STATE,
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: text
                        },
                        shareMediaCategory: SHARE_MEDIA_CATEGORY_ARTICLE,
                        media: [
                            {
                                status: STATUS,
                                originalUrl: articleURL
                            }
                        ]
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': VISIBILITY
                }
            };

            await axios.post(`${this.baseURL}/ugcPosts`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })
        } catch (error) {
            throw new Error(`LinkedIn API Error: ${error}`);
        }
    }

    /**
    * Uploads media from the specified file path with optional text and media type.
    * @param filePath The path to the media file.
    * @param text Optional text to accompany the media.
    * @param mediaType The type of media (should be lowercase 'image' or 'video').
    */
    async uploadMedia(filePath: string, text: string, mediaType: string) {
        try {
            const registerData = {
                registerUploadRequest: {
                    owner: this.URN,
                    recipes: [
                        `urn:li:digitalmediaRecipe:feedshare-${mediaType}`
                    ],
                    serviceRelationships: [
                        {
                            relationshipType: 'OWNER',
                            identifier: 'urn:li:userGeneratedContent'
                        }
                    ]
                }
            };

            const registerRes = await axios.post(`${this.baseURL}/assets?action=registerUpload`, registerData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const uploadUrl = registerRes?.data?.value?.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']?.uploadUrl;
            const asset = registerRes?.data?.value?.asset;


            await axios.post(uploadUrl, {
                file: fs.createReadStream(filePath)
            }, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            const uploadData = {
                author: this.URN,
                lifecycleState: LIFECYCLE_STATE,
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: text
                        },
                        shareMediaCategory: mediaType.toUpperCase(),
                        media: [
                            {
                                status: STATUS,
                                media: asset
                            }
                        ]
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': VISIBILITY
                }
            };

            await axios.post(`${this.baseURL}/ugcPosts`, uploadData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

        } catch (error) {
            throw new Error(`LinkedIn API Error: ${error}`);
        }
    }
}

export default LinkedIn;