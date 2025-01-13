import { Request, Response, NextFunction } from 'express';
import PostService from '../services/post.services'
import { CreatePostDTO } from '../dtos/post.dto';



class PostController {

    public postService = new PostService()


    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postData: CreatePostDTO = req.body
            const data = await this.postService.createPost(postData, req.user.id)
            res.status(200).json({ message: "Post created successfully", data })
        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err.message ?? "Something went wrong" })
        }
    };

}

export default PostController