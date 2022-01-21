import statusCodes, { StatusCodes } from 'http-status-codes'
import { Router, Response, Request, NextFunction, response } from "express";
import userRepositori from '../repositories/user.repositori';
import DatabaseError from '../models/errors/database.error.model';

const usersRoute = Router();

//endpoint GET
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    
    const users = await userRepositori.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

//endpoint GET by id
usersRoute.get('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
    
        const user = await userRepositori.findById(uuid);
    
        res.status(StatusCodes.OK).send(user);
        
    } catch (error) {
        next(error);
    }
    
});

//endpoint POST
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepositori.create(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
});

//endpoint PUT
usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiledUser = req.body;

    modifiledUser.uuid = uuid;

    await userRepositori.update(modifiledUser);

    res.status(StatusCodes.OK).send(modifiledUser);
});


//endpoint DELETE
usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    await userRepositori.removeUser(uuid);

    res.sendStatus(statusCodes.OK);
});

export default usersRoute;