import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { readFileData, writeFileData } from '../../utils/filehandling.js';
const jwt_secret = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email) {
            return res.status(200).json({
                message: 'All fields must be filled'
            });
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            })
        }
        const normalizedEmail = email.toLowerCase();

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password is aleast 8 characters'
            });
        }
        const userData = await readFileData('users.json');
        const isExistingUser = userData.find((user) => user.email === normalizedEmail);

        if (isExistingUser) {
            return res.status(400).json({
                message: 'User Already exist'
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id:'USR'+Date.now(),
            name: name,
            email: normalizedEmail,
            password: hashedPassword,
            role:'user'
        };

        userData.push(newUser);
        await writeFileData('users.json', userData);

        return res.status(200).json({
            message: 'Register Successfully'
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:'All fields must be filled'
            })
        }
        const normalizedEmail=email.toLowerCase();
        const userData = await readFileData('users.json');
        const user = userData.find((i) => i.email === normalizedEmail);

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found'
            })
        }
        else {

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Invalid Credentials'
                })
            }
            else {
                const token = jwt.sign({
                    id:user.id,
                    email: user.email,
                    role:user.role
                }, jwt_secret);
                 res.cookie("token", token,{
                    httpOnly:true,
                    sameSite:'strict'
                });
                return res.status(200).json({
                    message: 'Token is created successfully'
                })
            }
        }
    } catch (error) {
        return res.status(500).json(
            {
                message: 'Internal Server Error'
            }
        )
    }




}


export { register, login };