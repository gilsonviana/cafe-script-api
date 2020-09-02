import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import keys from '../../config/keys'

import * as http from '../../services/http'

import * as User from '../../models/User'
import * as Publisher from '../../models/Publisher'

export const login = async (req: Request<any, any, {email: string, password: string}>, res: Response) => {
    const requiredFields: string[] = ['email', 'password']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    try {
        const [user, ...a] = await User.GetByEmail(req.body.email)

        if (!user) {
            http.badRequest(res, 'Email not found.')
            return
        }
        
        if (!(await User.ComparePassword(req.body.password, user.password))) {
            http.unauthorizedRequest(res, "Email or password does not match.")
            return
        } 

        const uuid = v4()
        const token = jwt.sign({id: uuid},  keys.secret_key, { expiresIn: "30d" })

        try {
            await Publisher.UpdateLastActivity(user.publisher_id)
        } catch (e) {
            http.errorRequest(res, {message: "Could not update last activity.", error: e})
            return
        }
        
        http.successRequest(res, {
            token,
            user
        })
    } catch (e) {
        http.errorRequest(res, "Could not login.")
    }
}

export const signUp = async (req: Request<any, any, User.ISignUp>, res: Response) => {
    const requiredFields: string[] = ['email', 'password', 'publisher_id']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    const [user, ...a] = await User.GetByEmail(req.body.email)

    if (user) {
        http.badRequest(res, "Email already in use.")
        return
    }

    const [publisher, ...b] = await Publisher.VerifyIsApproved(req.body.publisher_id)

    if (!publisher) {
        http.notFoundRequest(res, "Could not find publisher.")
        return
    }

    if (publisher.hasOwnProperty('is_approved')) {
        if (publisher.is_approved === 0) {
            http.badRequest(res, "Publisher is not approved.")
            return
        }
    }

    const passwordHash = await User.EncryptPassword(req.body.password)

    try {
        await User.SignUp({
            email: req.body.email,
            password: passwordHash,
            publisher_id: req.body.publisher_id
        })
    } catch (e) {
        http.errorRequest(res, {message: "Could not save user.", error: e})
        return
    }

    res.json({
        message: "User created successfully."
    })
}