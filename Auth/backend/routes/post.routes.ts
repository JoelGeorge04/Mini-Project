import { CreatePostDTO } from '../dtos/post.dto';
import authMiddleware from '../middleware/auth.middleware';
import postController from '../controller/post.controller';
import { Router } from 'express';
import validationMiddleware from '../middleware/validation.middleware';

class PostRoutes {
    public router = Router();
    public path = '/post';

    public postController = new postController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authMiddleware,  // Add auth middleware here to authenticate user before creating a post
            validationMiddleware(CreatePostDTO, 'body'),
            this.postController.createPost
        );
    }
}

export default PostRoutes;