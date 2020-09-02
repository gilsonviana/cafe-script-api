import { Router } from 'express'
import { register } from '../controller/publisher'
import { signUp, login } from '../controller/user'

const router: Router = Router()

/**
 * Authentication
 */
router.post('/publisher/register', (req, res) => register(req, res))

router.post('/auth/signup', (req, res) => signUp(req, res))
router.post('/auth/login', (req, res) => login(req, res))

export default router