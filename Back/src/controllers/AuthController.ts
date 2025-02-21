import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.ts";

dotenv.config();

class AuthController {
static async register(req: Request, res: Response){
    const { name, email, password } = req.body;

    let secret = process.env.SECRET?process.env.SECRET:"LancaPerfumeRodometalicoDeAndrade"

    const passwordHash: string =CryptoJS.AES.encrypt(password,secret as string).toString();

    const user = new User({
        name:name,
        email:email,
        password:passwordHash,
    });
    
    try {
        await user.save();
        return res.status(201).send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Something failed" });
    }
}

static async login(req: Request, res: Response){
    const {email,password} = req.body;
    const user = await User.findOne({email});
    let secret = process.env.SECRET?process.env.SECRET:"LancaPerfumeRodomecanicoDeAndrade"
    
    if(!user)
        return res.status(400).send({message:"Invalid Email or Password"});

    let desci = CryptoJS.AES.decrypt(user.password,secret).toString(CryptoJS.enc.Utf8);
    console.log(desci)
    if(!(password !== desci))
        return res.status(400).send({message:"Invalid Email or Password"});

    const token = jwt.sign(
        {
            id:user._id,
        },
        secret as string,
        {
            expiresIn:'2 days'
        }
    );
    return res.status(200).send({token:token})
}
}

export default AuthController;