import { SignupDTO } from '../dtos/auth.dto'
import { LoginDTO } from '../dtos/auth.dto'
import { User, UserAttributes } from '../models/user'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginResponse, UserData } from '../interface/auth.interface'
import sendEmail from '../utils/sendEmail';

class AuthService {


//signup


    public async Signup(data: SignupDTO): Promise<UserData> {
        const user = await User.findOne({ where: { email: data.email } });      //check user by email
        if (user) {
            throw { status: 409, message: "User already exists" };
        }
        const newPassword = await bcrypt.hash(data.password, 10);         //hash the password
        const newUser = await User.create({ email: data.email, password: newPassword, name: data.name });  //create user;

        const result = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            isVerified: newUser.isVerified
        };

        const token = await jwt.sign(result, process.env.JWT_SECRET as string, {
            expiresIn: '86400'
        });

        sendEmail(newUser.email, newUser.name, token);       //send email for verification
        return result;
    }


//login


    public async login(data: LoginDTO): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email: data.email } });      //check user by email
        if (!user) {
            throw { status: 404, message: "User not exists" };
        }
        const isMatch = await bcrypt.compare(data.password, user.password);       //compare password for login
        if (!isMatch) {
            throw { status: 401, message: "Invalid credentials" };
        }
        //token generation
        const playload = {
            id: user.id,
            email: user.email,
            name: user.name,
            isVerified: user.isVerified
        }
        const token = await jwt.sign(playload, process.env.JWT_SECRET as string, {
            expiresIn: '86400'
        });
        return { user: playload, token: `Bearer ${token}` };

    }


    public async verifyEmail(token: string): Promise<LoginResponse> {

        //verifying the jwt token

        const res = jwt.verify(token, process.env.JWT_SECRET as string) as UserData;

        const user = await User.update({
            isVerified: true
        }, {
            where: {
                id: res.id
            },
            returning: true
        });

        const playload = {
            id: user[1][0].id,
            email: user[1][0].email,
            name: user[1][0].name,
            isVerified: user[1][0].isVerified
        }

        const authToken = await jwt.sign(playload, process.env.JWT_SECRET as string, {
            expiresIn: '86400'
        });
        return { user: playload, token: `Bearer ${authToken}` };
    }
}
export default AuthService;