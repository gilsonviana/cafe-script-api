import { Request, Response } from 'express'

import * as http from '../../services/http'

import * as Publisher from '../../models/Publisher'

export const register = (req: Request<any, any, Publisher.IPublisher>, res: Response) => {
    const requiredFields: string[] = ['name', 'email', 'topic_primary_id', 'topic_secondary_id']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    try {
        Publisher.RegisterWaitList(req.body).then((res) => console.log(res))
    } catch (e) {
        http.errorRequest(res, e.message)
        return
    }

    http.successRequest(res)
}

export const signUp = async (req: Request<any, any, Publisher.ISignUp>, res: Response) => {
    const requiredFields: string[] = ['email', 'password', 'publisher_id']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    const [user, ...a] = await Publisher.GetByEmail(req.body.email)

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

    const passwordHash = await Publisher.EncryptPassword(req.body.password)

    try {
        await Publisher.SignUp({
            email: req.body.email,
            password: passwordHash,
            publisher_id: req.body.publisher_id
        })
    } catch (e) {
        http.errorRequest(res, e)
        return
    }

    res.json({
        message: "User created sucessfully."
    })
}

/**
 * Admin resources
 */
export const update = (req: Request<any, any, Publisher.IUpdateIsApproved>, res: Response) => {
    const requiredFields: string[] = ['publisherId', 'isApproved']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    try {
        Publisher.UpdateIsApproved(req.body).then((res) => console.log(res))
    } catch (e) {
        http.errorRequest(res, e.message)
        return
    }

    http.successRequest(res, { message: 'Publisher updated sucessfully.' })
}   