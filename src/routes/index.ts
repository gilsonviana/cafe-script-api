import { Router, Request } from 'express'
import { register, writeArticle, readArticle } from '../controller/publisher'
import { signUp, login } from '../controller/user'

import authorization from '../middlewares/authorization'

const router: Router = Router()

/**
 * Authentication
 */
router.post('/publisher/register', (req, res) => register(req, res))
router.post('/publisher/article', authorization, (req, res) => writeArticle(req, res))
router.get('/publisher/article/:id', authorization, (req: Request<{id: string}>, res) => readArticle(req, res))

router.post('/auth/signup', (req, res) => signUp(req, res))
router.post('/auth/login', (req, res) => login(req, res))

export default router