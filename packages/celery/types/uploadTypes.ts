export interface ImageContent {
    type: 'image';
    data: File;
}

export interface VideoContent {
    type: 'video';
    data: File;
}

export interface TextContent {
    type: 'text';
    text: string;
}

export interface Content {
    title: string;
    text?: string;
    description: string,
    file?: File;
    media_type: ImageContent | VideoContent | TextContent;
}

export interface Payload {
    userID: string;
    platforms: string[];
    content: Content[];
    cost: number;
    time: string;
}