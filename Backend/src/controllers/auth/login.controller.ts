import { Request, Response } from 'express';

async function loginController(req: Request, res: Response){
    res.send("loginController!!");
}

export default loginController;
