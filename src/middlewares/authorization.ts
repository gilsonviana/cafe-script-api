import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../config/keys";
import * as http from '../services/http'


const authenticationRequired = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        http.badRequest(res, 'Missing token.')
        return
    }

    if (!jwt.verify(token, keys.secret_key)) {
        http.unauthorizedRequest(res, 'Invalid token.')
        return
    }

    const decoded = jwt.decode(token, {complete: true});

    req.user = decoded

    next();
};

export default authenticationRequired;
