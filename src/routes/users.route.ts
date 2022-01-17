import statusCodes from 'http-status-codes'
import { Router, Response, Request, NextFunction, response } from "express";

const usersRoute = Router();

//endpoint GET
usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [
        {
            userName: 'João',
            id: 1,
        },
        {
            userName: 'Joana',
            id: 2
        }
    ];

    res.status(statusCodes.OK).send(users);
});

//endpoint GET by id
usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    res.status(statusCodes.OK).send({ uuid });
});


//endpoint POST
usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    console.log(req.body);

    res.status(statusCodes.CREATED).send(newUser)
});

//endpoint PUT
usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiledUser = req.body;

    modifiledUser.uuid = 123456;

    res.status(statusCodes.OK).send(modifiledUser);
});


//endpoint DELETE
usersRoute.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    res.sendStatus(statusCodes.OK);
});

export default usersRoute;