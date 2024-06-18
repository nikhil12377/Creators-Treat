import axios from "axios";
import { mediaType } from "./types"
import { CAROUSEL, ERROR, FINISHED, IMAGE, REELS, STORIES, VIDEO } from "./utils/constants";
class Instagram {
    baseURL: string;
    instaID: string;
    accessToken: string;

    constructor(baseURL: string, instaID: string, accessToken: string) {
        this.baseURL = baseURL;
        this.instaID = instaID;
        this.accessToken = accessToken;
    }

    setOptions({ newAccessToken }: { newAccessToken: string }) {
        this.accessToken = newAccessToken;
    }

    /**
  * Checks the status of a media container by querying a specified URL.
  * This function is used to monitor whether the container is published or not.
  * Facebook API recommends querying a container's status once per minute, for no more than 5 minutes.
  * @param checkStatusURL The URL to query for the status of the media container.
  * @returns A Promise that resolves if the container's status is 'FINISHED' within 5 checks, or rejects if it encounters an 'ERROR'.
  */
    private async checkStatusCode(checkStatusURL: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let counter = 0;

            // Define an asynchronous function to recursively check the status
            const checkStatus = async () => {
                counter++; // Increment the counter to track the number of checks made

                try {
                    // Make a GET request to the specified URL to fetch the status_code field
                    const checkRes = await axios.get(checkStatusURL, {
                        params: { fields: 'status_code', access_token: this.accessToken },
                    });

                    const statusCode = checkRes.data.status_code; // Extract the status_code from the response

                    if (statusCode === ERROR) {
                        // If the status_code is 'ERROR', reject the promise with an error
                        reject(new Error("Job status is ERROR. Cancelling job."));
                    } else if (statusCode === FINISHED || counter >= 5) {
                        // If the status_code is 'FINISHED', resolve the promise
                        // Or if the maximum number of checks (5) is reached, resolve the promise
                        resolve();
                    } else {
                        // If the status_code is neither 'ERROR' nor 'FINISHED', wait for 60 seconds and then check again
                        setTimeout(checkStatus, 60000);
                    }
                } catch (error) {
                    // If an error occurs during the GET request, reject the promise with the error
                    reject(new Error(`Error checking status: ${error.message}`));
                }
            };

            // Initiate the first checkStatus call to start the recursive status checking process
            checkStatus();
        });
    }


    /**
    * Uploads an image to Instagram using the Instagram Graph API.
    * This function first creates media on Instagram and then publishes it.
    * @param imgURL The URL of the image to be uploaded.
    * @param caption The caption to accompany the uploaded image.
    * @throws Error if there's an issue during the API calls for media creation or publishing.
    */
    async uploadImage(imgURL: string, caption: string) {
        try {
            const creationURL = `${this.baseURL}/${this.instaID}/media`;
            const publishURL = `${this.baseURL}/${this.instaID}/media_publish`;

            const data = {
                image_url: imgURL,
                caption: caption,
                access_token: this.accessToken
            }

            const creationRes = await axios.post(creationURL, data)
            const creationID = creationRes.data.id;

            await axios.post(publishURL, null, {
                params: {
                    creation_id: creationID,
                    access_token: this.accessToken
                }
            })

        } catch (error) {
            throw new Error(`Instagram API Error: ${error}`);
        }
    }

    /**
    * Uploads a Reel (video) to Instagram using the Instagram Graph API.
    * This function handles the creation, status checking, and publishing of a Reels video.
    * @param coverURL The URL of the cover image for the Reels video.
    * @param videoURL The URL of the Reels video to be uploaded.
    * @param caption The caption to accompany the Reels video.
    * @throws Error if there's an issue during the API calls for media creation, status checking, or publishing.
    */
    async uploadReels(coverURL: string, videoURL: string, caption: string) {
        try {
            const creationURL = `${this.baseURL}/${this.instaID}/media`;
            const publishURL = `${this.baseURL}/${this.instaID}/media_publish`;

            const data = {
                media_type: REELS,
                caption: caption,
                video_url: videoURL,
                cover_url: coverURL,
                access_token: this.accessToken
            }
            const creationRes = await axios.post(creationURL, data)

            const creationID = creationRes?.data?.id;
            const checkStatusURL = `${this.baseURL}/${creationID}`;

            const jobPromise = this.checkStatusCode(checkStatusURL);
            await jobPromise;

            const uploadPayload = {
                creation_id: creationID,
                access_token: this.accessToken
            };
            await axios.post(publishURL, uploadPayload);

        } catch (error) {
            throw new Error(`Instagram API Error: ${error}`);
        }
    }

    /**
    * Uploads a story (image) to Instagram using the Instagram Graph API.
    * This function handles the creation and publishing of an Instagram story.
    * @param imgURL The URL of the image to be uploaded as a story.
    * @throws Error if there's an issue during the API calls for media creation or publishing.
    */
    async uploadStory(imgURL: string) {
        try {
            const creationURL = `${this.baseURL}/${this.instaID}/media`;
            const publishURL = `${this.baseURL}/${this.instaID}/media_publish`;

            const data = {
                media_type: STORIES,
                image_url: imgURL,
                access_token: this.accessToken
            }

            const creationRes = await axios.post(creationURL, data)
            const creationID = creationRes.data.id;

            await axios.post(publishURL, null, {
                params: {
                    creation_id: creationID,
                    access_token: this.accessToken
                }
            })

        } catch (error) {
            throw new Error(`Instagram API Error: ${error}`);
        }
    }

    /**
    * Asynchronously uploads a carousel (multiple images or videos) to Instagram using the Instagram Graph API.
    * This function handles the creation, status checking, and publishing of an Instagram carousel.
    * @param caption The caption to accompany the carousel.
    * @param media An array of objects representing media items (images or videos) to include in the carousel.
    * @throws Error if there's an issue during the API calls for media creation, status checking, or publishing.
    */
    async uploadCarousal(caption: string, media: mediaType[]) {
        try {
            const creationURL = `${this.baseURL}/${this.instaID}/media`;
            const publishURL = `${this.baseURL}/${this.instaID}/media_publish`;

            // Array to store IDs of created media items (carousel items)
            var mediaContainer: string[] = [];

            // Process each media item asynchronously using Promise.all
            await Promise.all(media.map(async (item, index) => {
                let data;

                if (item.type === IMAGE.toLowerCase()) {
                    data = {
                        is_carousel_item: true,
                        image_url: item.imgURL,
                        access_token: this.accessToken
                    };
                } else {
                    data = {
                        is_carousel_item: true,
                        media_type: VIDEO,
                        video_url: item.videoURL,
                        cover_url: item.coverURL,
                        access_token: this.accessToken
                    };
                }

                const creationRes = await axios.post(creationURL, data);
                const creationID = creationRes.data.id;


                const checkStatusURL = `${this.baseURL}/${creationID}`;
                const jobPromise = this.checkStatusCode(checkStatusURL);
                await jobPromise;

                // Store the ID of the created carousel item in the media container array
                mediaContainer.push(creationID);
            }));

            const uploadData = {
                caption: caption,
                media_type: CAROUSEL,
                children: mediaContainer,
                access_token: this.accessToken
            };

            const creationRes = await axios.post(creationURL, uploadData);
            const creationID = await creationRes.data.id;

            const uploadPayload = {
                creation_id: creationID,
                access_token: this.accessToken
            };

            const checkStatusURL = `${this.baseURL}/${creationID}`;
            const jobPromise = this.checkStatusCode(checkStatusURL);
            await jobPromise;

            await axios.post(publishURL, uploadPayload);

        } catch (error) {
            throw new Error(`Instagram API Error: ${error}`);
        }
    }
}


export default Instagram;