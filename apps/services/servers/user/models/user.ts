import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import { UserType } from '../utils/constants';

interface IUser {
  id: string;
  loginId: string;
  username: string;
  userType: UserType; // UserType is an enum

  firstName?: string;
  lastName?: string;
  gender?: string;

  email: string;
  password: string;
  phoneNumber?: string;

  profilePicture?: string;
  dateOfBirth?: Date;
  preferredLanguage?: string;
  timezone?: string;

  location?: { city?: string; state?: string };

  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  status: 'active' | 'inactive' | 'suspended' | 'deleted';
  lastLogin?: Date;
}

class User extends Model<IUser, Partial<IUser>> {
  static async findOrCreateUser({
    email,
    loginId,
    username,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    profilePicture,
    preferredLanguage,
    location,
    isEmailVerified,
  }: Pick<
    IUser,
    | 'email'
    | 'loginId'
    | 'username'
    | 'firstName'
    | 'lastName'
    | 'gender'
    | 'dateOfBirth'
    | 'profilePicture'
    | 'preferredLanguage'
    | 'location'
    | 'isEmailVerified'
  >): Promise<IUser> {
    const [user, created] = await User.findOrCreate({
      where: { email, loginId },
      defaults: {
        loginId,
        username,
        email,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        profilePicture,
        preferredLanguage,
        location,
        isEmailVerified,
      },
    });

    if (!created) {
      await user.updateExistingUser({
        loginId,
        username,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        profilePicture,
        preferredLanguage,
        location,
      });
    }

    return user.get({ plain: true }) as IUser;
  }

  static async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  // update the updateExistingUser if they updated their facebook profile and trying to login again
  async updateExistingUser(updates: Partial<IUser>) {
    await this.update({
      loginId: updates.loginId,
      username: updates.username,
      firstName: updates.firstName,
      lastName: updates.lastName,
      gender: updates.gender,
      dateOfBirth: updates.dateOfBirth,
      profilePicture: updates.profilePicture,
      preferredLanguage: updates.preferredLanguage,
      location: updates.location,
      lastLogin: new Date(),
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userType: {
      type: DataTypes.ENUM(...Object.values(UserType)),
      allowNull: false,
      defaultValue: 'fan',
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    preferredLanguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    location: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPhoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended', 'deleted'),
      allowNull: false,
      defaultValue: 'active',
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

export { IUser };
export default User;
