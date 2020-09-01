import { Request, Response, Router } from 'express'

import { update } from '../../../controller/publisher'

const router: Router = Router()

router.patch('/', (req: Request, res: Response) => update(req, res))

export default router