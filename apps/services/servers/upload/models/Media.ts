import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import { UUID } from 'crypto';
import { Content } from '../types/environment';
import logger from "@creators/logger";

interface IMedia {
  id?: string;
  userID: string;
  platform: string;
  title?: string;
  description?: string;
  text?: string;
  mediaType: 'video' | 'image' | 'text';
  URL?: string;
  paid: boolean;
  cost: number;
  uploadDate: Date
}

class Media extends Model<IMedia, Partial<IMedia>>{
  static async createBulkMedia(
    platforms: string[],
    content: Content[],
    userID: string,
    cost: number,
    time: Date
  ) {
    try {
      const mediaPayloads = content.map((post: Content) => {
        return {
          userID,
          mediaType: post.media_type.type,
          paid: cost ? true : false,
          cost: cost || 0,
          text: post.text || '',
          URL: post.file ? post.URL : '',
          title: post.file ? post.title : '',
          description: post.file ? post.description : '',
          uploadDate: time
        };
      });

      const mediaEntries = platforms.map((platform) => {
        return mediaPayloads.map((payload) => ({ ...payload, platform }));
      });

      const flattenedMediaEntries = mediaEntries.flat();

      const [media] = await Media.bulkCreate(flattenedMediaEntries, { ignoreDuplicates: true });
      return media;
    } catch (error) {
      logger.log(`Error in createBulkMedia: ${error.message}`)
      logger.error(error);
      throw error;
    }
  }

  static async getMedia(id: UUID) {
    try {
      const media = await Media.findOne({ where: { id } });
      return media;
    } catch (error) {
      logger.log(`Error in getMedia: ${error.message}`);
      logger.error(error);
      throw error;
    }
  }
}

Media.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mediaType: {
      type: DataTypes.ENUM("video", "image", "text"),
      allowNull: false,
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Media",
    tableName: 'media',
    timestamps: true
  },
);

export default Media;
