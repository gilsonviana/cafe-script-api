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