import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepositori from "../repositories/user.repositori";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas')
        }

        //'Basic YWRtaW46YWRtaW4='
        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        console.log(tokenContent);

        const [username, password] = tokenContent.split(':');

        if (!username || !password) {
            throw new ForbiddenError('Credenciais não preenchidas');
        }


        const user = await userRepositori.findByUsernameAndPassword(username, password);
        console.log(user);

        if (!user) {
            throw new ForbiddenError('Usuario ou senha invalidos!');
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;