import { Router } from 'express'
import { register, signUp } from '../controller/publisher'

const router: Router = Router()

/**
 * Authentication
 */
router.post('/publisher/register', (req, res) => register(req, res))
router.post('/publisher/signup', (req, res) => signUp(req, res))

export default router