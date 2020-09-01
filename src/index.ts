import express, { Request, Response, NextFunction } from 'express'
import bodyParser from "body-parser"
import morgan from "morgan"
import { config } from 'dotenv'

import routes from './routes'
import adminRoutes from './routes/admin'

config()

const PORT: number | any = 8800 || process.env.port

const app: express.Application = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

app.use(bodyParser.json(({ limit: "10mb" })));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Error handler
app.use('/', (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(500).send()
        return
    }
    next()
})

// API entry points
app.use('/', routes)
app.use('/admin', adminRoutes)

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))