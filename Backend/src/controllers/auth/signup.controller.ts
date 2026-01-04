import { Request, Response } from 'express';

async function signupController(req: Request, res: Response){
    res.send("signupController!!");
}

export default signupController;
