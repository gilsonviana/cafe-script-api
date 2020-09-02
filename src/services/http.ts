import { Request, Response } from 'express'

/**
 * @description Verify if the required params exist in the request body
 * @param params 
 */
export const verifyRequiredParams = (req: Request, params: string[], option: 'body' | 'params' = 'body'): void => {
    const { body } = req

    if (option === 'params') {
        for (let i = 0; i < params.length; i++) {
            if (!(params[i] in req.params)) {
                throw new Error(`Plese, insert the following field: ${params[i]}`)
            }
        }
        return
    }

    for (let i = 0; i < params.length; i++) {
        if (!(params[i] in body)) {
            throw new Error(`Plese, insert the following field: ${params[i]}`)
        }
    }
}

/**
 * @description HTTP STATUS CODE 500
 */
export const errorRequest = (res: Response, message: any) => {
    res.status(500).json({message})
}

/**
 * @description HTTP STATUS CODE 400
 */
export const badRequest = (res: Response, message: any) => {
    res.status(400).json({message})
}

/**
 * @description HTTP STATUS CODE 401
 */
export const unauthorizedRequest = (res: Response, message: any) => {
    res.status(401).json({message})
}

/**
 * @description HTTP STATUS CODE 404
 */
export const notFoundRequest = (res: Response, message: any) => {
    res.status(404).json({message})
}

/**
 * @description HTTP STATUS CODE 200 | CODE 201
 */
export const successRequest = (res: Response, body?: any, createdResource?: boolean) => {
    if (createdResource) {
        res.status(201).json({body})
        return
    }
    res.status(200).json({body})
}

