import { Request, Response, Router } from 'express'

import publisherRoutes from './publisher'

const router: Router = Router()

router.use('/publisher', publisherRoutes)

export default router