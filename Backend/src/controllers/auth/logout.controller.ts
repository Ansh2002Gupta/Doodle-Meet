import { Request, Response } from 'express';

async function logoutController(req: Request, res: Response){
    res.send("logoutController!!");
}

export default logoutController;
