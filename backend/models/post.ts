import { DataTypes, Model} from 'sequelize'
import sequelize from './index';

export interface PostAttributes {
    id: number;
    title: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    
}

export class Post extends Model<PostAttributes> implements PostAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
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

