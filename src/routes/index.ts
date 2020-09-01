import { Router, Request, Response } from 'express'
import { register } from '../controller/publisher'

const router: Router = Router()

/**
 * Authentication
 */
router.post('/publisher/register', (req: Request, res: Response) => register(req, res))

export default router