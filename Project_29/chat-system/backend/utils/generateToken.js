import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    try {
        // Generate JWT token
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '15d',           // Token valid for 15 days
        });

        // Set the cookie with the JWT token
        res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,           // 15 days in milliseconds
            httpOnly: true,                             // Prevent access from JavaScript
            sameSite: 'strict',                         // Prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production',      // Secure in production (HTTPS)
        });
    } catch (error) {
        console.error('Error generating token and setting cookie:', error.message);
        throw new Error('Failed to generate token');
    }
};

export default generateTokenAndSetCookie;
