import { Client } from "twitter-api-sdk";

class Twitter {
  client: Client;

  constructor(accessToken: string) {
    this.client = new Client(accessToken);
  }

  textTweet(data: string): void {
    try {
      this.client.tweets.createTweet({ text: data })
    } catch (error) {
      throw new Error(`Twitter API Error: ${error}`);
    }
  }

  mediaTweet(data: string, media_ids: string[], tagged_user_ids: string[]): void {
    try {
      this.client.tweets.createTweet({
        text: data,
        media: {
          media_ids: media_ids,
          tagged_user_ids: tagged_user_ids
        }
      });
    } catch (error) {
      throw new Error(`Twitter API Error: ${error}`);
    }
  }
}

export default Twitter;