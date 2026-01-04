import { Request, Response } from "express";

export async function signupController(req: Request, res: Response){
    res.send('signup controller!!');
}

export async function loginController(req: Request, res: Response){
    res.send("login controller!!");
}

export async function logoutController(req: Request, res: Response){
    res.send("logout controller!!");
}
