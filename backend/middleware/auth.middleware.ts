import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserData } from '../interface/auth.interface'; // Assuming this is your UserData interface
import { User } from '../models/user'; // Assuming the User model is set up properly

// Middleware function for authentication
async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers['authorization'];
    
    // Check if the authorization header exists
    if (authHeader) {
        try {
            // Split the header value to extract the token
            const authToken = authHeader.split("Bearer ")[1];
            if (!authToken) {
                res.status(401).json({ message: 'Invalid Authorization header' });
                return;
            }
            
            // Verify the token using jwt.verify
            const verified = jwt.verify(authToken, process.env.JWT_SECRET as string) as UserData;
            
            // Find the user by ID
            const user = await User.findOne({ where: { id: verified.id } });
            
            // If user doesn't exist
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // If user is not verified
            if (!user.isVerified) {
                res.status(401).json({ message: 'User not verified' });
                return;
            }

            // Attach the user data to the request object
            req.user = verified;
            next(); // Pass control to the next middleware/route handler
        } catch (err) {
            res.status(401).json({ message: 'Wrong Token' });
            return;
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
}

export default authMiddleware;
