import { Request, Response } from 'express'

import * as http from '../../services/http'

import * as Publisher from '../../models/Publisher'
import * as Article from '../../models/Article'

export const register = async (req: Request<any, any, Publisher.IPublisher>, res: Response) => {
    const requiredFields: string[] = ['name', 'email', 'topic_primary_id', 'topic_secondary_id']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    try {
        await Publisher.RegisterWaitList(req.body).then((res) => console.log(res))
    } catch (e) {
        http.errorRequest(res, {message: "Could not save publisher.", error: e})
        return
    }

    http.successRequest(res)
}

/**
 * Admin resources
 */
export const update = async (req: Request<any, any, Publisher.IUpdateIsApproved>, res: Response) => {
    const requiredFields: string[] = ['publisherId', 'isApproved']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    try {
        await Publisher.UpdateIsApproved(req.body).then((res) => console.log(res))
    } catch (e) {
        http.errorRequest(res, {message: "Could not update publisher.", error: e})
        return
    }

    http.successRequest(res, { message: 'Publisher updated successfully.' })
}   

export const writeArticle  = async (req: Request<any, any, Article.ICreateArticle>, res: Response) => {
    const requiredFields: string[] = ['title', 'content', 'publisher_id', 'topic_id']

    try {
        http.verifyRequiredParams(req, requiredFields)
    } catch (e) {
        http.badRequest(res, e.message)
        return
    }

    try {
        await Article.CreateArticle(req.body)
    } catch (e) {
        http.errorRequest(res, {message: "Could not create article.", error: e})
        return
    }

    try {
        await Publisher.UpdateLastActivity(req.body.publisher_id)
    } catch (e) {
        http.errorRequest(res, {message: "Could not update last activity.", error: e})
        return
    }

    http.successRequest(res, "Article written successfully.")
}

export const readArticle = async (req: Request<{id: string}, any, any>, res: Response) => {
    const parsedArticleId = parseInt(req.params.id)
    
    if (isNaN(parsedArticleId)) {
        http.badRequest(res, "Invalid article id.")
        return
    }

    try {
        const [article, ...a] = await Article.GetArticle(parsedArticleId)

        if (!article) {
            http.notFoundRequest(res, "Article not found.")
            return
        }

        http.successRequest(res, article)
    } catch (e) {
        http.errorRequest(res, {message: "Could not get article.", error: e})
        return
    }
}