import { DataTypes, Model, Optional} from 'sequelize'
import sequelize from './index';
import { Post } from './post';

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    
}

export interface UserInput extends Optional<UserAttributes,| 'id'| 'isVerified'> {}

export class User extends Model<UserAttributes,UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly isVerified!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    deletedAt: {
        type: DataTypes.DATE
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,         //temporarily delete the data soft delete
});

User.hasMany(Post)
Post.belongsTo(User,{foreignKey: 'userId'})