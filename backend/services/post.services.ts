import { CreatePostDTO } from '../dtos/post.dto';
import { Post, PostAttributes } from '../models/post';

class PostService {

    public async createPost(data: CreatePostDTO, userId: number): Promise<PostAttributes> {
        return await Post.create({
            title: data.title,
            description: data.description,
            userId
        });
    }
}
export default PostService;