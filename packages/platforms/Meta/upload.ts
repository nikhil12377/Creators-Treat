import axios from "axios";
import fs from "fs";
class Meta {
    baseURL: string;
    pageID: string;
    accessToken: string;

    constructor(baseURL: string, pageID: string, accessToken: string) {
        this.baseURL = baseURL;
        this.pageID = pageID;
        this.accessToken = accessToken;
    }

    setOptions({ newAccessToken }: { newAccessToken: string }) {
        this.accessToken = newAccessToken;
    }

    async uploadText(msg: string) {
        try {
            const url = `${this.baseURL}/${this.pageID}/feed`;
            const data = {
                message: msg,
                access_token: this.accessToken
            }

            await axios.post(url, data);

        } catch (error) {
            throw new Error(`Meta API Error: ${error}`);
        }
    }

    async uploadImage(msg: string, imageURL: string) {
        try {
            const url = `${this.baseURL}/${this.pageID}/photos`;
            const data = {
                message: msg,
                url: imageURL,
                access_token: this.accessToken
            }

            await axios.post(url, data)

        } catch (error) {
            throw new Error(`Meta API Error: ${error}`);
        }
    }

    async uploadVideo(title: string, description: string, videoPath: string, thumbnailPath: string) {
        try {
            const url = `${this.baseURL}/${this.pageID}/videos`;

            const data = {
                title: title,
                description: description,
                access_token: this.accessToken,
                source: fs.createReadStream(videoPath),
                thumb: fs.createReadStream(thumbnailPath)
            }

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        } catch (error) {
            throw new Error(`Meta API Error: ${error}`);
        }
    }
}

export default Meta;